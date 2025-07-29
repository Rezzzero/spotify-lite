import { subscibeToArtist } from "#utils/supabase/user/userUtils";

export const subscribeHandler = async (req, res) => {
  const artistData = req.body;
  try {
    const data = await subscibeToArtist(artistData);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
