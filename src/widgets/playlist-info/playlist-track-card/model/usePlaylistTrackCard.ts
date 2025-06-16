import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Track } from "@shared/types/types";

export const usePlaylistTrackCard = ({
  setTracks,
  handleUpdateDuration,
}: {
  setTracks: (tracks: Track[] | ((prevTracks: Track[]) => Track[])) => void;
  handleUpdateDuration: (trackDuration: number, isAdd: boolean) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { id: playlistId } = useParams();

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

  const handleDeleteTrack = async (trackId: string, trackDuration: number) => {
    try {
      const response = await axios.post("http://localhost:3000/delete-track", {
        trackId,
        playlistId,
      });

      if (response.status === 200) {
        setTracks((prevTracks: Track[]) =>
          prevTracks.filter((track) => track.id !== trackId)
        );
        handleUpdateDuration(trackDuration, false);
      }
    } catch (error) {
      console.error("Error deleting track:", error);
    }
  };

  return {
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    buttonRef,
    handleDeleteTrack,
  };
};
