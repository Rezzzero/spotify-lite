import { useDebouncedSearch } from "@shared/lib/hooks/useDebouncedSearch";
import { SearchResults, Track, Album } from "@shared/types/types";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const useAddTrackSearch = ({
  setTracks,
  handleUpdateDuration,
}: {
  setTracks: (tracks: Track[] | ((prevTracks: Track[]) => Track[])) => void;
  handleUpdateDuration: (trackDuration: number, isAdd: boolean) => void;
}) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState({} as SearchResults);
  const [showAll, setShowAll] = useState("");
  const [showTracksAndAlbums, setShowTracksAndAlbums] = useState(false);
  const [showAlbum, setShowAlbum] = useState(false);
  const [artistTopTracks, setArtistTopTracks] = useState<Track[]>([]);
  const [artistAlbums, setArtistAlbums] = useState<Album[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);
  const { id: playlistId } = useParams();

  useDebouncedSearch({ value, setResults, redirect: false });

  const handleAddTrack = async (track: Track) => {
    const trackToAdd = {
      id: track.id,
      name: track.name,
      duration_ms: track.duration_ms,
      album: {
        id: track.album?.id ?? "",
        name: track.album?.name ?? "",
        images: track.album?.images ?? [],
      },
      artists: track.artists ?? [],
      mp3_url: "",
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/add-track-to-playlist",
        {
          track: trackToAdd,
          playlist_id: playlistId,
        }
      );

      const { track, playlistTrack } = response.data;
      setTracks((prevTracks: Track[]) => [
        ...prevTracks,
        {
          ...track,
          added_at: playlistTrack.added_at,
        },
      ]);
      handleUpdateDuration(track.duration_ms, true);
    } catch (error) {
      console.error("Error adding track to playlist:", error);
    }
  };

  const handleGetArtistTopTracksAndAlbums = async (artistId: string) => {
    setShowTracksAndAlbums(true);
    const topTracks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/artist-top-tracks/${artistId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching artist's top tracks:", error);
      }
    };
    const albums = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/artist-albums/${artistId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching artist's albums:", error);
      }
    };

    const [topTracksResponse, albumsResponse] = await Promise.all([
      topTracks(),
      albums(),
    ]);

    if (topTracksResponse) {
      setArtistTopTracks(topTracksResponse);
    }
    if (albumsResponse) {
      setArtistAlbums(albumsResponse);
    }
  };

  const handleGetAlbumTracks = async (albumId: string) => {
    setShowAlbum(true);
    setShowAll("");
    setShowTracksAndAlbums(false);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/album-tracks/${albumId}`
      );
      const albumData = response.data;
      const tracksWithAlbumData = albumData.tracks.items.map(
        (track: Track) => ({
          ...track,
          album: {
            id: albumData.id,
            name: albumData.name,
            images: albumData.images,
          },
        })
      );
      setAlbum({
        ...albumData,
        tracks: { ...albumData.tracks, items: tracksWithAlbumData },
      });
    } catch (error) {
      console.error("Error fetching album tracks:", error);
    }
  };

  return {
    value,
    setValue,
    results,
    setResults,
    showAll,
    setShowAll,
    handleAddTrack,
    handleGetArtistTopTracksAndAlbums,
    artistTopTracks,
    artistAlbums,
    setShowTracksAndAlbums,
    showTracksAndAlbums,
    showAlbum,
    setShowAlbum,
    album,
    handleGetAlbumTracks,
  };
};
