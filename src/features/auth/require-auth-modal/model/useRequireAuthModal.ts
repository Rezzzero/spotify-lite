import { usePlayerStore } from "@app/store/player/usePlayerStore";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { useEffect, useRef, useState } from "react";

export const useRequireAuthModal = () => {
  const { currentTrack, isAuthModalOpen, closeAuthModal } = usePlayerStore();
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeAuthModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeAuthModal]);

  return {
    currentTrack,
    imageColors,
    isAuthModalOpen,
    modalRef,
    closeAuthModal,
    isVisible,
  };
};
