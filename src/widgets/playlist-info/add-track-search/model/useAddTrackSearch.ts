import { useDebouncedSearch } from "@shared/lib/hooks/useDebouncedSearch";
import { SearchResults, Track } from "@shared/types/types";
import axios from "axios";
import { useState } from "react";

export const useAddTrackSearch = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState({} as SearchResults);
  const [showAll, setShowAll] = useState("");

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
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/add-track-to-playlist",
        {
          track: trackToAdd,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error adding track to playlist:", error);
    }
  };

  return { value, setValue, results, showAll, setShowAll, handleAddTrack };
};
