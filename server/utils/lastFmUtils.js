import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

export const getArtistLocalName = async (query) => {
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(
    query
  )}&api_key=${LASTFM_API_KEY}&format=json`;

  try {
    const { data } = await axios.get(url);

    if (data.error) {
      console.error("Last.fm API error:", data.message);
      return null;
    }

    const artist = data.results?.artistmatches?.artist[0];

    return artist ? artist.name : null;
  } catch (error) {
    console.error(
      `Error fetching artist data from Last.fm for query "${query}":`,
      error.message
    );
    return null;
  }
};
