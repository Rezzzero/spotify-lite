import {
  getArtist,
  getArtistTopTracks,
  getArtistAlbumsAndSingles,
  getArtistIdsFromAlbums,
  getSeveralArtists,
  getMoreWithArtist,
  getPlaylistsWithArtist,
} from "../../utils/spotifyUtils.js";

export const artistHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const artist = await getArtist(id);
    const topTracks = await getArtistTopTracks(id);
    const albumsAndSingles = await getArtistAlbumsAndSingles(
      id,
      "album,single"
    );
    const ids = getArtistIdsFromAlbums(albumsAndSingles);
    const otherArtists = await getSeveralArtists(ids);
    const moreWithArtist = await getMoreWithArtist(id);
    const playlists = await getPlaylistsWithArtist(artist.name);

    res.json({
      artist,
      topTracks,
      albumsAndSingles,
      otherArtists,
      moreWithArtist,
      playlists,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
