import { useTrackCard } from "@features/track-card/model/useTrackCard";

export const useDiscographyTrackCard = () => {
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
  } = useTrackCard();

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
  };
};
