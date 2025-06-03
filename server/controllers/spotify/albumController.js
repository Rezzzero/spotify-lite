import {
  getAlbum,
  getArtist,
  getArtistAlbumsAndSingles,
} from "../../utils/spotifyUtils.js";

export const albumHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const album = await getAlbum(id);
    const artist = await getArtist(album.artists[0].id);
    const otherAlbums = await getArtistAlbumsAndSingles(
      album.artists[0].id,
      "album,single"
    );
    res.json({ album, artist, otherAlbums });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
