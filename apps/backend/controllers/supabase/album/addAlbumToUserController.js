import { addAlbumToUser } from "#utils/supabase/album/albumUtils";

export const addAlbumToUserHandler = async (req, res) => {
  try {
    const userId = req.body.userId;
    const albumData = req.body.albumData;
    const albumId = albumData.id;
    const data = await addAlbumToUser(userId, albumId, albumData);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
