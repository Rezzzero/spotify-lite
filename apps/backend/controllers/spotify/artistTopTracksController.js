import { getArtistTopTracks } from "#utils/spotifyUtils";

export const artistTopTracksHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const topTracks = await getArtistTopTracks(id);
    res.json(topTracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
