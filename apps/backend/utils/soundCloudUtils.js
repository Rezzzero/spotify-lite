import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const soundCloudClientId = process.env.SOUND_CLOUD_CLIENT_ID;

export const getSoundCloudSearchResults = async (query) => {
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

export const getSoundCloudStream = async (url) => {
  try {
    const response = await axios.get(`${url}?client_id=${soundCloudClientId}`);
    return response.data.url;
  } catch (error) {
    console.error("Error fetching SoundCloud stream:", error);
  }
};

export const searchAlbumOrPlaylistSoundCloud = async (query) => {
  try {
    const response = await axios.get(
      `https://api-v2.soundcloud.com/search/playlists?q=${encodeURIComponent(
        query
      )}&client_id=${soundCloudClientId}&limit=10`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching SoundCloud albums or playlists search results:",
      error
    );
  }
};
