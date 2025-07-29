import { unsubscribeFromArtist } from "#utils/supabase/user/userUtils";

export const unsubscribeHandler = async (req, res) => {
  const userId = req.body.userId;
  const artistId = req.params.id;
  try {
    const data = await unsubscribeFromArtist(artistId, userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
