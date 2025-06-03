import { getPopularArtists } from "../../utils/spotifyUtils.js";

export async function getPopularArtistsHandler(_, res) {
  try {
    const artists = await getPopularArtists();
    res.json({ artists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
