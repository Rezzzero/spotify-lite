import { useTrackCard } from "@features/track-card/model/useTrackCard";
import { Album } from "@shared/types/types";

export const useDiscographyTrackCard = ({ album }: { album: Album }) => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    buttonRef,
    isAddToMediaLibraryModalOpen,
    addToMediaLibraryRef,
    handleMouseEnter,
    handleMouseLeave,
    handleAddTrackToPlaylist,
    handleListenTrack,
  } = useTrackCard({ album });

  return {
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    buttonRef,
    isAddToMediaLibraryModalOpen,
    addToMediaLibraryRef,
    handleMouseEnter,
    handleMouseLeave,
    handleAddTrackToPlaylist,
    handleListenTrack,
  };
};
