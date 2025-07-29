import {
  getPlaylistsOfUser,
  getUserAlbums,
} from "#utils/supabase/user/userUtils";

export const getUsersMediaLibraryHandler = async (req, res) => {
  try {
    const userId = req.body.userId;
    const playlists = await getPlaylistsOfUser(userId);
    const albums = await getUserAlbums(userId);
    res.json({ playlists, albums });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
