import { getPlaylist } from "../../../utils/supabaseUtils.js";

export const getPlaylistHandler = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const playlist = await getPlaylist(playlistId);
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
