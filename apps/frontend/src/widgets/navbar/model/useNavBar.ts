import { useLocation } from "react-router-dom";
import { useUserStore } from "@app/store/user/useUser";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";
import React, { useRef, useState } from "react";
import { useClickOutside } from "@shared/lib/hooks/useClickOutside";
import { openMenuOrModal } from "@shared/lib/utils/openMenuOrModal";
import { closeMenuOrModal } from "@shared/lib/utils/closeMenuOrModal";

export const useNavbar = () => {
  const { user, userImagePreview } = useUserStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(
    null
  );
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useClickOutside({
    refs: [userMenuRef],
    handler: () => closeMenuOrModal(setIsUserMenuOpen, setUserMenuAnchor),
    enabled: isUserMenuOpen,
  });

  const handleCloseMenu = () => {
    closeMenuOrModal(setIsUserMenuOpen, setUserMenuAnchor);
  };

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    openMenuOrModal(e, setIsUserMenuOpen, setUserMenuAnchor);
  };

  const handleSignOut = async () => {
    try {
      await axios.post(`${API_URL}/signout`, null, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    location,
    handleSignOut,
    userImagePreview,
    isUserMenuOpen,
    userMenuAnchor,
    userMenuRef,
    handleOpenUserMenu,
    handleCloseMenu,
  };
};
