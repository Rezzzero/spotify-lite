import { useDebouncedSearch } from "@shared/lib/hooks/useDebouncedSearch";
import { SearchResults, Track } from "@shared/types/types";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const useAddTrackSearch = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState({} as SearchResults);
  const [showAll, setShowAll] = useState("");
  const { id: playlistId } = useParams();

  useDebouncedSearch({ value, setResults, redirect: false });

  const handleAddTrack = async (track: Track) => {
    const trackToAdd = {
      id: track.id,
      name: track.name,
      duration_ms: track.duration_ms,
      album: {
        id: track.album.id,
        name: track.album.name,
        images: track.album.images,
      },
      artists: track.artists,
      mp3_url: "",
      added_at: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/add-track-to-playlist",
        {
          track: trackToAdd,
          playlist_id: playlistId,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error adding track to playlist:", error);
    }
  };

  return { value, setValue, results, showAll, setShowAll, handleAddTrack };
};
