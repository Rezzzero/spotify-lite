import { getOpenUserPlaylists, getUserById } from "#utils/supabaseUtils";

export const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  const openedPlaylists = await getOpenUserPlaylists(id);
  res.json({ ...user, openedPlaylists });
};
