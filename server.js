import express from "express";
import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "redis";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function getArtistIdsFromAlbums(albums) {
  const ids = [];
  const mainArtistId = albums[0].artists[0].id;
  albums.forEach((album) => {
    album.artists.forEach((artist) => {
      if (artist.id !== mainArtistId && !ids.includes(artist.id)) {
        ids.push(artist.id);
      }
    });
  });

  return ids;
}

function maskEmail(email) {
  const [localPart, domainPart] = email.split("@");

  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const maskedLocal = `${firstChar}${"*".repeat(
    Math.max(0, localPart.length - 2)
  )}${lastChar}`;

  const domainName = domainPart.split(".")[0];
  const domainFirstChar = domainName[0];
  const maskedDomain = `${domainFirstChar}${"*".repeat(
    Math.max(0, domainName.length - 1)
  )}`;
  const domainSuffix = domainPart.slice(domainName.length);

  return `${maskedLocal}@${maskedDomain}${domainSuffix}`;
}

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const soundCloudClientId = process.env.SOUND_CLOUD_CLIENT_ID;
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceRoleKey);
const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

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
      )}&type=track,artist,album,playlist,show,episode`,
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

const getSoundCloudSearchResults = async (query) => {
  try {
    const response = await axios.get(
      `https://api-v2.soundcloud.com/search/tracks?q=${encodeURIComponent(
        query
      )}&client_id=${soundCloudClientId}&limit=10`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching SoundCloud search results:", error);
  }
};

const getSoundCloudStream = async (url) => {
  try {
    const response = await axios.get(`${url}?client_id=${soundCloudClientId}`);
    return response.data.url;
  } catch (error) {
    console.error("Error fetching SoundCloud stream:", error);
  }
};

const getArtist = async (id) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching artist:", error);
  }
};

const getArtistTopTracks = async (id) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=UA`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.tracks;
  } catch (error) {
    console.error("Error fetching artist's top tracks:", error);
  }
};

const getArtistAlbumsAndSingles = async (id, include) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums?include_groups=${include}&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching artist's albums:", error);
  }
};

const getSeveralArtists = async (ids) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/artists?ids=${ids.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.artists;
  } catch (error) {
    console.error("Error fetching several artists:", error);
  }
};
const getSeveralAlbums = async (ids) => {
  const accessToken = await getAccessToken();
  const chunkSize = 20;
  const result = [];

  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunk = ids.slice(i, i + chunkSize);

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/albums?ids=${chunk.join(",")}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      result.push(...response.data.albums);
    } catch (error) {
      console.error(
        `Error fetching albums for chunk [${chunk.join(",")}]:`,
        error
      );
    }
  }

  return result;
};

const getMoreWithArtist = async (artistId) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=appears_on`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching playlist with artist:", error);
  }
};

const getPlaylistsWithArtist = async (artist) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${artist}&type=playlist`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.playlists.items;
  } catch (error) {
    console.error("Error fetching playlist with artist:", error);
  }
};

const getAlbum = async (id) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${id}?market=RU`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching album:", error);
  }
};

const getTrack = async (id) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching track:", error);
  }
};

const checkEmail = async (email) => {
  const { data, error } = await supabaseAdmin.rpc("check_email_exists", {
    email_param: email,
  });

  if (error) {
    console.error("Ошибка проверки email:", error.message);
  }
  return data;
};

const signUp = async (userData) => {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        userName: userData.userName,
        gender: userData.gender,
        birthday: userData.birthday,
        monthOfBirthday: userData.monthOfBirthday,
        yearOfBirthday: userData.yearOfBirthday,
      },
    },
  });

  if (error) {
    console.error("Ошибка регистрации:", error.message);
  }

  return data;
};

const signIn = async (userData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userData.email,
    password: userData.password,
  });

  if (error) {
    throw new Error("Неверный email или пароль");
  }

  return data;
};

const sendOtp = async (email) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) {
    if (error.message.includes("User not found")) {
      const customError = new Error(
        "Адрес электронной почты или имя пользователя не привязаны к учетной записи Spotify"
      );
      customError.status = 400;
      throw customError;
    }

    const customError = new Error(
      "Ошибка при отправке кода. Попробуйте позже."
    );
    customError.status = 500;
    throw customError;
  }

  return {
    success: true,
    message: "Код отправлен на вашу почту",
    coveredEmail: maskEmail(email),
  };
};

const signInWithOtp = async (email, otp) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (error) {
    const msg = error.message.toLowerCase();

    if (msg.includes("invalid login")) {
      const err = new Error("Неверный код. Попробуйте снова.");
      err.status = 400;
      throw err;
    }

    if (msg.includes("token has expired")) {
      const err = new Error("Код истёк. Запросите новый код.");
      err.status = 400;
      throw err;
    }

    const err = new Error("Не удалось подтвердить код. Попробуйте позже.");
    err.status = 500;
    throw err;
  }

  return {
    success: true,
    message: "Код успешно подтверждён",
    session: data.session,
  };
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

app.get("/api/artist/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const artist = await getArtist(id);
    const topTracks = await getArtistTopTracks(id);
    const albumsAndSingles = await getArtistAlbumsAndSingles(
      id,
      "album,single"
    );
    const ids = getArtistIdsFromAlbums(albumsAndSingles);
    const otherArtists = await getSeveralArtists(ids);
    const moreWithArtist = await getMoreWithArtist(id);
    const playlists = await getPlaylistsWithArtist(artist.name);
    res.json({
      artist,
      topTracks,
      albumsAndSingles,
      otherArtists,
      moreWithArtist,
      playlists,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/album/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const album = await getAlbum(id);
    const artist = await getArtist(album.artists[0].id);
    const otherAlbums = await getArtistAlbumsAndSingles(
      album.artists[0].id,
      "album,single"
    );
    res.json({ album, artist, otherAlbums });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/track/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const track = await getTrack(id);
    const artist = await getArtist(track.artists[0].id);
    const topTracks = await getArtistTopTracks(artist.id);
    const albumsAndSingles = await getArtistAlbumsAndSingles(
      artist.id,
      "album,single"
    );
    res.json({ track, artist, topTracks, albumsAndSingles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/discography/:artistId", async (req, res) => {
  const artistId = req.params.artistId;
  try {
    const albumsAndSingles = await getArtistAlbumsAndSingles(
      artistId,
      "album,single"
    );
    const albumIds = albumsAndSingles.map((album) => album.id);
    const discography = await getSeveralAlbums(albumIds);

    res.json({ discography });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/soundcloud-search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }
  try {
    const results = await getSoundCloudSearchResults(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/soundcloud-stream", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }
  try {
    const stream = await getSoundCloudStream(url);
    res.json(stream);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/check-email", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const data = await checkEmail(email);
    res.json({ exists: !!data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    const data = await signUp(userData);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email и пароль обязательны" });
    }
    const data = await signIn({ email, password });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/auth/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error:
          "Введите имя пользователя или адрес электронной почты из аккаунта Spotify.",
      });
    }

    const result = await sendOtp(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

app.post("/auth/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await signInWithOtp(email, otp);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
