import axios from "axios";
import redisClient from "../clients/redis/redisClient.js";
import dotenv from "dotenv";
import qs from "qs";

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let cachedToken = null;
let tokenExpiresAt = 0;

export const getArtistIdsFromAlbums = (albums) => {
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
};

export const getAccessToken = async () => {
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

const getSpotifyRequestConfig = async () => {
  const accessToken = await getAccessToken();
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": "ru",
    },
  };
};

export const getPopularTracks = async () => {
  try {
    const cached = await redisClient.get("popular-tracks");

    if (cached) {
      return JSON.parse(cached);
    }

    const requestConfig = await getSpotifyRequestConfig();

    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/7iFPfffm9ntC7LVqVt4O6f",
      requestConfig
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

export const getPopularArtists = async () => {
  try {
    const cached = await redisClient.get("popular-artists");

    if (cached) {
      return JSON.parse(cached);
    }

    const requestConfig = await getSpotifyRequestConfig();
    const tracks = await getPopularTracks();

    const artistIds = tracks.map((track) => track.track.artists[0].id);

    const uniqueArtistIds = [...new Set(artistIds)];

    const response = await axios.get(
      `https://api.spotify.com/v1/artists?ids=${uniqueArtistIds.join(",")}`,
      requestConfig
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

export const getNewRealeses = async () => {
  try {
    const cached = await redisClient.get("new-releases");

    if (cached) {
      return JSON.parse(cached);
    }

    const requestConfig = await getSpotifyRequestConfig();

    const response = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      requestConfig
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

export const getArtist = async (id) => {
  try {
    const requestConfig = await getSpotifyRequestConfig();
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}`,
      requestConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching artist:", error);
  }
};

export async function getSearchResults(query) {
  try {
    if (!query || typeof query !== "string") {
      throw new Error("Query must be a non-empty string");
    }
    const requestConfig = await getSpotifyRequestConfig();

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track,artist,album,playlist,show,episode`,
      requestConfig
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

export const getArtistTopTracks = async (id) => {
  try {
    const requestConfig = await getSpotifyRequestConfig();
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=UA`,
      requestConfig
    );
    return response.data.tracks;
  } catch (error) {
    console.error("Error fetching artist's top tracks:", error);
  }
};

export const getArtistAlbumsAndSingles = async (id, include) => {
  try {
    const requestConfig = await getSpotifyRequestConfig();
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums?include_groups=${include}&limit=50`,
      requestConfig
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching artist's albums:", error);
  }
};

export const getSeveralArtists = async (ids) => {
  try {
    const requestConfig = await getSpotifyRequestConfig();
    const response = await axios.get(
      `https://api.spotify.com/v1/artists?ids=${ids.join(",")}`,
      requestConfig
    );
    return response.data.artists;
  } catch (error) {
    console.error("Error fetching several artists:", error);
  }
};

export const getSeveralAlbums = async (ids) => {
  const requestConfig = await getSpotifyRequestConfig();
  const chunkSize = 20;
  const result = [];

  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunk = ids.slice(i, i + chunkSize);

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/albums?ids=${chunk.join(",")}`,
        requestConfig
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

export const getMoreWithArtist = async (artistId) => {
  try {
    const requestConfig = await getSpotifyRequestConfig();
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=appears_on`,
      requestConfig
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching playlist with artist:", error);
  }
};

export const getPlaylistsWithArtist = async (artist) => {
  try {
    const requestConfig = await getSpotifyRequestConfig();
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${artist}&type=playlist`,
      requestConfig
    );
    return response.data.playlists.items;
  } catch (error) {
    console.error("Error fetching playlist with artist:", error);
  }
};

export const getAlbum = async (id) => {
  try {
    const requestConfig = await getSpotifyRequestConfig();
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${id}?market=RU`,
      requestConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching album:", error);
  }
};

export const getTrack = async (id) => {
  try {
    const requestConfig = await getSpotifyRequestConfig();
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${id}`,
      requestConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching track:", error);
  }
};
