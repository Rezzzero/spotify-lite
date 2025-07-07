import { getPopularTracks } from "../../utils/spotifyUtils.js";

export async function getPopularTracksHandler(_, res) {
  try {
    const tracks = await getPopularTracks();
    res.json({ tracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
