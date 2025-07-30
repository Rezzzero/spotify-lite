import { deleteAlbumFromUser } from "#utils/supabase/album/albumUtils";

export const deleteAlbumFromUserHandler = async (req, res) => {
  try {
    const albumId = req.body.albumId;
    const userId = req.body.userId;
    const data = await deleteAlbumFromUser(userId, albumId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
