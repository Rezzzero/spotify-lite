import { addTrackToPlaylist, getOrUpdateTrack } from "#utils/supabaseUtils";

export const addTrackHandler = async (req, res) => {
  try {
    const track = req.body.track;
    const playlistId = req.body.playlist_id;
    const savedTrack = await getOrUpdateTrack(track);
    const data = await addTrackToPlaylist(savedTrack, playlistId);
    res.json(data);
  } catch (error) {
    if (error.message === "Track isn't available") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
