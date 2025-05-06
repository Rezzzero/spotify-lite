import express from "express";
import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "redis";

dotenv.config();

const app = express();
app.use(cors());
const port = 3000;

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let cachedToken = null;
let tokenExpiresAt = 0;

const getAccessToken = async () => {
  const now = Date.now();

  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }

  const token = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    qs.stringify({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${token}`,
      },
    }
  );

  cachedToken = response.data.access_token;
  tokenExpiresAt = now + response.data.expires_in * 1000 - 5000;
  return cachedToken;
};

const getPopularTracks = async () => {
  try {
    const cached = await redisClient.get("popular-tracks");

    if (cached) {
      return JSON.parse(cached);
    }

    const accessToken = await getAccessToken();

    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/7iFPfffm9ntC7LVqVt4O6f",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const tracks = response.data.tracks.items;

    await redisClient.set("popular-tracks", JSON.stringify(tracks), {
      EX: 86400,
    });

    return tracks;
  } catch (error) {
    console.error("Error fetching popular tracks:", error);
  }
};

const getPopularArtists = async () => {
  try {
    const cached = await redisClient.get("popular-artists");

    if (cached) {
      return JSON.parse(cached);
    }

    const accessToken = await getAccessToken();
    const tracks = await getPopularTracks();

    const artistIds = tracks.map((track) => track.track.artists[0].id);

    const uniqueArtistIds = [...new Set(artistIds)];

    const response = await axios.get(
      `https://api.spotify.com/v1/artists?ids=${uniqueArtistIds.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const artists = response.data.artists;

    await redisClient.set("popular-artists", JSON.stringify(artists), {
      EX: 86400,
    });

    return artists;
  } catch (error) {
    console.error("Error fetching popular artists:", error);
  }
};

const getNewRealeses = async () => {
  try {
    const cached = await redisClient.get("new-releases");

    if (cached) {
      return JSON.parse(cached);
    }

    const accessToken = await getAccessToken();

    const response = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const releases = response.data.albums.items;

    await redisClient.set("new-releases", JSON.stringify(releases), {
      EX: 86400,
    });

    return releases;
  } catch (error) {
    console.error("Error fetching new releases:", error);
  }
};

const getSearchResults = async (query) => {
  try {
    if (!query || typeof query !== "string") {
      throw new Error("Query must be a non-empty string");
    }
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track,artist,album,playlist`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

app.get("/api/popular-tracks", async (_, res) => {
  try {
    const tracks = await getPopularTracks();
    res.json({ tracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/popular-artists", async (_, res) => {
  try {
    const artists = await getPopularArtists();
    res.json({ artists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/new-releases", async (_, res) => {
  try {
    const releases = await getNewRealeses();
    res.json({ releases });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }
  try {
    const results = await getSearchResults(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
