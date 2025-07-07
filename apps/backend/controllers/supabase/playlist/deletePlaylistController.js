import {
  deletePlaylist,
  deletePlaylistImage,
  deleteAllTracksFromPlaylist,
  deletePlaylistFromUser,
} from "../../../utils/supabaseUtils.js";

export const deletePlaylistHandler = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    await deleteAllTracksFromPlaylist(playlistId);
    await deletePlaylistFromUser(playlistId);
    const data = await deletePlaylist(playlistId);
    await deletePlaylistImage(playlistId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
