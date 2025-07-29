import {
  updatePlaylist,
  getPlaylistImageUrl,
  uploadImageToSupabasePlaylists,
} from "#utils/supabase/playlist/playlistUtils";

export const uploadPlaylistImageHandler = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Файл не предоставлен" });
    }

    await uploadImageToSupabasePlaylists(file, playlistId);
    const imageUrl = getPlaylistImageUrl(playlistId);
    const playlist = await updatePlaylist(playlistId, {
      images: [{ url: imageUrl }],
    });

    res.json(playlist);
  } catch (error) {
    console.error("Ошибка в uploadPlaylistImageHandler:", error);
    res.status(500).json({ error: error.message });
  }
};
