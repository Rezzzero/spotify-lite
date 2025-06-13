import {
  getPlaylist,
  getUserByAccessToken,
} from "../../../utils/supabaseUtils.js";

export const getPlaylistHandler = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const accessToken = req.cookies.access_token;
    const { playlist, tracks } = await getPlaylist(playlistId);
    let user;

    if (!accessToken && playlist.public === false) {
      return res.status(404).json({ error: "Страница не найдена" });
    }

    if (accessToken) {
      user = await getUserByAccessToken(accessToken);
    }

    if (
      (playlist.public === false && playlist.user_id !== user.id) ||
      !playlist
    ) {
      return res.status(404).json({ error: "Страница не найдена" });
    }

    res.json({ ...playlist, tracks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
