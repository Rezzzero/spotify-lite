import { testAddAlbumToSupabase } from "#utils/supabase/album/albumUtils";

export const testAddAlbumHandler = async (req, res) => {
  const albumId = req.params.id;
  try {
    const data = await testAddAlbumToSupabase(albumId);
    res.json(data);
  } catch {
    res.status(500).json({ error: error.message });
  }
};
