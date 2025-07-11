import { deletePlaylistFromUser } from "#utils/supabaseUtils";

export const deletePlaylistFromUserHandler = async (req, res) => {
  try {
    const playlistId = req.params.id;
    const userId = req.body.userId;
    const data = await deletePlaylistFromUser(playlistId, userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
