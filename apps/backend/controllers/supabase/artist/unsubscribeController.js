import { unsubscribeFromArtist } from "#utils/supabaseUtils";

export const unsubscribeHandler = (req, res) => {
  const userId = req.body.userId;
  const artistId = req.params.id;
  try {
    const data = unsubscribeFromArtist(artistId, userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
