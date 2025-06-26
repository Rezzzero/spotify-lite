import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Track } from "@shared/types/types";
import { API_URL } from "@shared/constants/constants";

export const useTrackInfoTrackCard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddToMediaLibraryModalOpen, setIsAddToMediaLibraryModalOpen] =
    useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const addToMediaLibraryRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setIsAddToMediaLibraryModalOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsAddToMediaLibraryModalOpen(false);
    }, 200);
  };

  const handleAddTrackToPlaylist = async (playlistId: string, track: Track) => {
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
      const response = await axios.post(`${API_URL}/add-track-to-playlist`, {
        track: trackToAdd,
        playlist_id: playlistId,
      });

      setIsAddToMediaLibraryModalOpen(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding track to playlist:", error);
    }
  };

  return {
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    buttonRef,
    isAddToMediaLibraryModalOpen,
    setIsAddToMediaLibraryModalOpen,
    addToMediaLibraryRef,
    handleMouseEnter,
    handleMouseLeave,
    handleAddTrackToPlaylist,
  };
};
