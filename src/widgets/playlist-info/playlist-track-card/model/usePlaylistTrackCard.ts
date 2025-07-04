import axios from "axios";
import { Track } from "@shared/types/types";
import { API_URL } from "@shared/constants/constants";
import { useTrackCard } from "@features/track-card/model/useTrackCard";

export const usePlaylistTrackCard = ({
  track,
  setTracks,
  handleUpdateDuration,
}: {
  track: Track;
  setTracks: (tracks: Track[] | ((prevTracks: Track[]) => Track[])) => void;
  handleUpdateDuration: (trackDuration: number, isAdd: boolean) => void;
}) => {
  const {
    isCurrent,
    isMenuOpen,
    setIsMenuOpen,
    isPlaying,
    pause,
    menuRef,
    buttonRef,
    isAddToMediaLibraryModalOpen,
    addToMediaLibraryRef,
    handleMouseEnter,
    handleMouseLeave,
    handleAddTrackToPlaylist,
    handleListenTrack,
  } = useTrackCard({ track });

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

  return {
    isCurrent,
    isMenuOpen,
    setIsMenuOpen,
    isPlaying,
    pause,
    menuRef,
    buttonRef,
    handleDeleteTrack,
    isAddToMediaLibraryModalOpen,
    addToMediaLibraryRef,
    handleMouseEnter,
    handleMouseLeave,
    handleAddTrackToPlaylist,
    handleListenTrack,
  };
};
