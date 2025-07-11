import { updatePlaylist } from "#utils/supabaseUtils";

export const deletePlaylistImageHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = await updatePlaylist(id, {
      images: [
        {
          url: "https://jiiyqowxssltsrpijqog.supabase.co/storage/v1/object/public/playlist//playlist-placeholder.png",
        },
      ],
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
