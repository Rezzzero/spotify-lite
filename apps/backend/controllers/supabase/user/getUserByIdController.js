import {
  getOpenUserPlaylists,
  getUserById,
  getUserFollowers,
} from "#utils/supabase/user/userUtils";

export const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  const openedPlaylists = await getOpenUserPlaylists(id);
  const followers = await getUserFollowers(id);
  res.json({ ...user, openedPlaylists, followers });
};
