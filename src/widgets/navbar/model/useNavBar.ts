import { useLocation } from "react-router-dom";
import { useUserStore } from "src/app/store/user/useUser";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";
import { useEffect, useRef, useState } from "react";

export const useNavbar = () => {
  const { user, userImagePreview } = useUserStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isUserMenuOpen &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);

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
