import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { useClickOutside } from "@shared/lib/hooks/useClickOutside";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const useMediaLibraryCard = ({ propId }: { propId: string }) => {
  const {
    isMediaMenuOpen,
    currentMenuId,
    handleOpenMediaMenu,
    handleCloseMediaMenu,
  } = useMediaLibraryStore();
  const { id: paramId } = useParams();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  useClickOutside({
    refs: [menuRef],
    handler: () => handleCloseMediaMenu(),
    enabled: isMediaMenuOpen,
  });
  const currentId = propId || paramId;

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    if (!currentId) return;
    e.stopPropagation();
    e.preventDefault();
    setPosition({ top: e.clientY, left: e.clientX });
    handleOpenMediaMenu(currentId);
  };

  const isOpen = isMediaMenuOpen && currentMenuId === currentId;

  return {
    isMediaMenuOpen,
    handleCloseMediaMenu,
    isOpen,
    paramId,
    currentMenuId,
    position,
    menuRef,
    handleOpenMenu,
    confirmDeleteModal,
    setConfirmDeleteModal,
  };
};
