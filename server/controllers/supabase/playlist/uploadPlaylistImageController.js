import { uploadImageToSupabasePlaylists } from "../../../utils/supabaseUtils.js";

export const uploadPlaylistImageHandler = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Файл не предоставлен" });
    }

    const data = await uploadImageToSupabasePlaylists(file, playlistId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
