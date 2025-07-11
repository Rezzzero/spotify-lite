import { getPlaylistsOfUser } from "#utils/supabaseUtils";

export const getPlaylistsOfUserHandler = async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = await getPlaylistsOfUser(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
