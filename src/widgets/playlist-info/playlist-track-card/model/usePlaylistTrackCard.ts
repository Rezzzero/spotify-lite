import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Track } from "@shared/types/types";
import { formatDate } from "@shared/lib/format/formatDate";
import { formatTimeAgo } from "@shared/lib/format/formatTimeAgo";
import { API_URL } from "@shared/constants/constants";

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

  const handleDeleteTrack = async (trackDuration: number, entryId: string) => {
    try {
      const response = await axios.post(`${API_URL}/delete-track`, {
        entryId,
      });

      if (response.status === 200) {
        setTracks((prevTracks: Track[]) =>
          prevTracks.filter((track) => track.entry_id !== entryId)
        );
        handleUpdateDuration(trackDuration, false);
      }
    } catch (error) {
      console.error("Error deleting track:", error);
    }
  };

  const formatAddedAt = (addedAt: string) => {
    const date = new Date(addedAt);
    const now = new Date();
    const diffInMonths =
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30);

    return diffInMonths >= 1 ? formatDate(addedAt) : formatTimeAgo(addedAt);
  };

  return {
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    buttonRef,
    handleDeleteTrack,
    formatAddedAt,
  };
};
