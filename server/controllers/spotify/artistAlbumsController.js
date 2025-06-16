import { getArtistAlbumsAndSingles } from "../../utils/spotifyUtils.js";

export const artistAlbumsHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const albums = await getArtistAlbumsAndSingles(id, "album");
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
