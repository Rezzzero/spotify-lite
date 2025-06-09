import {
  getPlaylist,
  getPlaylistImageUrl,
} from "../../../utils/supabaseUtils.js";

export const getPlaylistHandler = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const playlist = await getPlaylist(playlistId);
    const playlistImage = getPlaylistImageUrl(playlistId);
    res.json({ playlist, playlistImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
