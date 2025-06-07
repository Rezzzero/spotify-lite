import { createPlaylist } from "../../utils/supabaseUtils.js";

export const createPlaylistHandler = async (req, res) => {
  try {
    const playlistData = req.body;

    const data = await createPlaylist(playlistData);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
