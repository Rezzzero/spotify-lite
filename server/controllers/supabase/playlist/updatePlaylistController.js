import { updatePlaylist } from "../../../utils/supabaseUtils.js";

export const updatePlaylistHandler = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const playlistData = req.body;
    const data = await updatePlaylist(playlistId, playlistData);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
