import { createPlaylist, addPlaylistToUser } from "#utils/supabaseUtils";

export const createPlaylistHandler = async (req, res) => {
  try {
    const playlistData = req.body;
    const data = await createPlaylist(playlistData);
    await addPlaylistToUser(playlistData.id, playlistData.user_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
