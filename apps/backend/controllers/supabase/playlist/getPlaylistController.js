import {
  getPlaylist,
  getUserByAccessToken,
  getUserById,
} from "../../../utils/supabaseUtils.js";

export const getPlaylistHandler = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const userId = req.body.userId;
    const accessToken = req.cookies.access_token;
    const { playlist, tracks } = await getPlaylist(playlistId, userId);
    const ownerData = await getUserById(playlist.user_id);

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

    const owner = {
      id: ownerData.id,
      display_name: ownerData.userName,
      imageUrl: ownerData.imageUrl,
    };

    res.json({ ...playlist, owner, tracks });
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Страница не найдена" });
    }
    res.status(500).json({ error: error.message });
  }
};
