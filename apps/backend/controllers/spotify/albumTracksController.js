import { getAlbum } from "#utils/spotifyUtils";

export const albumTracksHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const album = await getAlbum(id);
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
