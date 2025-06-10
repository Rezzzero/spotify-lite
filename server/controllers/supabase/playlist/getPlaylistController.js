import {
  getPlaylist,
  getUserByAccessToken,
} from "../../../utils/supabaseUtils.js";

export const getPlaylistHandler = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const accessToken = req.cookies.access_token;
    const playlist = await getPlaylist(playlistId);

    if (!accessToken && playlist.public === false) {
      return res.status(404).json({ error: "Страница не найдена" });
    }

    const user = await getUserByAccessToken(accessToken);

    if (
      (playlist.public === false && playlist.user_id !== user.id) ||
      !playlist
    ) {
      return res.status(404).json({ error: "Страница не найдена" });
    }

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
