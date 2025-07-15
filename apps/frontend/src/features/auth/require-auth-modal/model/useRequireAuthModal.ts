import { usePlayerStore } from "@app/store/player/usePlayerStore";
import { useClickOutside } from "@shared/lib/hooks/useClickOutside";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { useEffect, useRef, useState } from "react";

export const useRequireAuthModal = () => {
  const { currentTrack, isAuthModalOpen, closeAuthModal } = usePlayerStore();
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { imageColors } = useGetColors(
    currentTrack ? currentTrack.album.images[0].url : ""
  );
  useClickOutside({
    refs: [modalRef],
    handler: () => closeAuthModal(),
    enabled: isAuthModalOpen,
  });

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
    modalRef,
    closeAuthModal,
    isVisible,
  };
};
