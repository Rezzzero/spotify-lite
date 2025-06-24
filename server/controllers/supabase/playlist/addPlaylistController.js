import { addPlaylistToUser } from "../../../utils/supabaseUtils.js";

export const addPlaylistHandler = async (req, res) => {
  try {
    const playlistId = req.params.id;
    const userId = req.body.user_id;
    console.log(playlistId, userId);
    const data = await addPlaylistToUser(playlistId, userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
