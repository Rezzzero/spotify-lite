import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Album, Track } from "@shared/types/types";
import { API_URL } from "@shared/constants/constants";
import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";
import { toast } from "react-toastify";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";

export const useTrackCard = ({ album }: { album?: Album } = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { selectTrackToListen } = useMediaLibraryStore();
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
    const albumData = album
      ? {
          id: album.id,
          name: album.name,
          images: album.images,
        }
      : {
          id: track.album?.id ?? "",
          name: track.album?.name ?? "",
          images: track.album?.images ?? [],
        };
    const trackToAdd = {
      id: track.id,
      name: track.name,
      duration_ms: track.duration_ms,
      album: albumData,
      artists: track.artists ?? [],
      mp3_url: "",
    };

    try {
      const response = await axios.post(`${API_URL}/add-track-to-playlist`, {
        track: trackToAdd,
        playlist_id: playlistId,
      });

      setIsAddToMediaLibraryModalOpen(false);
      toast(
        <div className="flex items-center">
          <img
            src={
              response.data.track.album?.images[0]?.url ||
              PLAYLIST_PLACEHOLDER_URL
            }
            alt="обложка"
            className="w-6 h-6 mr-2 rounded-md"
          />
          <span className="font-bold">
            Добавлено сюда: «{response.data.playlistName}»
          </span>
        </div>,
        {
          style: { width: "360px" },
        }
      );
    } catch (error) {
      console.error("Error adding track to playlist:", error);
    }
  };

  const handleListenTrack = (track: Track) => {
    selectTrackToListen(track);
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
    handleListenTrack,
  };
};
