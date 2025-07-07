import { getNewRealeses } from "../../utils/spotifyUtils.js";

export async function getNewReleasesHandler(_, res) {
  try {
    const releases = await getNewRealeses();
    res.json({ releases });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
