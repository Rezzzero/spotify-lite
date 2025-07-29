import { getOpenUserPlaylists } from "#utils/supabase/user/userUtils";

export const getOpenUserPlaylistsHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const playlists = await getOpenUserPlaylists(id);
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
