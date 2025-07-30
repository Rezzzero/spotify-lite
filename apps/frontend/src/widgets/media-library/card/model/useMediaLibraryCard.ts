import { useClickOutside } from "@shared/lib/hooks/useClickOutside";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const useMediaLibraryCard = () => {
  const { id: currentId } = useParams();
  const [cardMenuOpen, setCardMenuOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    refs: [menuRef],
    handler: () => setCardMenuOpen(false),
    enabled: cardMenuOpen,
  });

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setPosition({ top: e.clientY, left: e.clientX });
    setCardMenuOpen(true);
  };
  //add menu logic
  return {
    currentId,
    cardMenuOpen,
    setCardMenuOpen,
    position,
    menuRef,
    handleOpenMenu,
  };
};
