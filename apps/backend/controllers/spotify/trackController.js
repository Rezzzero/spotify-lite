import {
  getArtist,
  getArtistAlbumsAndSingles,
  getArtistTopTracks,
  getTrack,
} from "#utils/spotifyUtils";

export const trackHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const track = await getTrack(id);
    const artist = await getArtist(track.artists[0].id);
    const topTracks = await getArtistTopTracks(artist.id);
    const albumsAndSingles = await getArtistAlbumsAndSingles(
      artist.id,
      "album,single"
    );
    res.json({ track, artist, topTracks, albumsAndSingles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
