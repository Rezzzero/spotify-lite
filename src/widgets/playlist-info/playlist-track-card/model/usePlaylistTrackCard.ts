import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const usePlaylistTrackCard = () => {
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

  const handleDeleteTrack = async (trackId: string) => {
    try {
      const response = await axios.post("http://localhost:3000/delete-track", {
        trackId,
        playlistId,
      });
      console.log(response);
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
