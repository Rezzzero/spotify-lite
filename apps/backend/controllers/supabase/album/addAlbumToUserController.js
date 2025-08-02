import { addAlbumToUser } from "#utils/supabase/album/albumUtils";

export const addAlbumToUserHandler = async (req, res) => {
  try {
    const userId = req.body.userId;
    const albumId = req.body.albumId;
    const data = await addAlbumToUser(userId, albumId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
