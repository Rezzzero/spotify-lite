import { deletePlaylist } from "../../../utils/supabaseUtils.js";

export const deletePlaylistHandler = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const data = await deletePlaylist(playlistId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
