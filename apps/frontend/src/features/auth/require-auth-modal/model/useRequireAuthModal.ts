import { usePlayerStore } from "@app/store/player/usePlayerStore";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { useEffect, useState } from "react";

export const useRequireAuthModal = () => {
  const { currentTrack, isAuthModalOpen, closeAuthModal } = usePlayerStore();
  const [isVisible, setIsVisible] = useState(false);
  const { imageColors } = useGetColors(
    currentTrack ? currentTrack.album.images[0].url : ""
  );

  useEffect(() => {
    if (isAuthModalOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isAuthModalOpen]);

  return {
    currentTrack,
    imageColors,
    isAuthModalOpen,
    closeAuthModal,
    isVisible,
  };
};
