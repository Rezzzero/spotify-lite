import {
  getArtistAlbumsAndSingles,
  getSeveralAlbums,
} from "#utils/spotifyUtils";

export const discographyHandler = async (req, res) => {
  const artistId = req.params.artistId;
  try {
    const albumsAndSingles = await getArtistAlbumsAndSingles(
      artistId,
      "album,single"
    );
    const albumIds = albumsAndSingles.map((album) => album.id);
    const discography = await getSeveralAlbums(albumIds);

    res.json({ discography });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
