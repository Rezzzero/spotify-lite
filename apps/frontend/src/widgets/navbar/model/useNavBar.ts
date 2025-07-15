import { useLocation } from "react-router-dom";
import { useUserStore } from "@app/store/user/useUser";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";
import { useRef, useState } from "react";
import { useClickOutside } from "@shared/lib/hooks/useClickOutside";

export const useNavbar = () => {
  const { user, userImagePreview } = useUserStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useClickOutside({
    refs: [userMenuRef],
    handler: () => setIsUserMenuOpen(false),
    enabled: isUserMenuOpen,
  });

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

  const handleUserMenuOpen = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return {
    user,
    location,
    handleSignOut,
    userImagePreview,
    isUserMenuOpen,
    userMenuRef,
    handleUserMenuOpen,
  };
};
