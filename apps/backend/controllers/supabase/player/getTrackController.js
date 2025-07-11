import { getOrUpdateTrack } from "#utils/supabaseUtils";

export const getTrackHandler = async (req, res) => {
  try {
    const track = req.body.track;
    const savedTrack = await getOrUpdateTrack(track);
    res.json(savedTrack);
  } catch (error) {
    if (error.message === "Track isn't available") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
