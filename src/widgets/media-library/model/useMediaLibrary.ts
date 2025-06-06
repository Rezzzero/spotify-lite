import { useEffect, useRef, useState } from "react";
import { useUserStore } from "src/app/store/user/useUser";
import { useNavigate } from "react-router-dom";
import { generateId } from "@shared/lib/id/generateId";

export const useMediaLibrary = () => {
  const { user } = useUserStore();
  const [createPlaylistModal, setCreatePlaylistModal] = useState(false);
  const [LoginPromptModal, setLoginPromptModal] = useState(false);
  const navigate = useNavigate();
  const createPlaylistRef = useRef<HTMLDivElement>(null);
  const loginPromptRef = useRef<HTMLDivElement>(null);
  const createPlaylistButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        createPlaylistModal &&
        createPlaylistRef.current &&
        !createPlaylistRef.current.contains(event.target as Node) &&
        createPlaylistButtonRef.current &&
        !createPlaylistButtonRef.current?.contains(event.target as Node)
      ) {
        setCreatePlaylistModal(false);
      }

      if (
        LoginPromptModal &&
        loginPromptRef.current &&
        !loginPromptRef.current.contains(event.target as Node)
      ) {
        setLoginPromptModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [createPlaylistModal, LoginPromptModal]);

  const handleCreatePlaylist = () => {
    setCreatePlaylistModal(false);

    if (user) {
      const id = generateId();
      navigate(`/playlist/${id}`);
    } else {
      setLoginPromptModal(true);
    }
  };

  return {
    user,
    createPlaylistModal,
    setCreatePlaylistModal,
    handleCreatePlaylist,
    LoginPromptModal,
    setLoginPromptModal,
    createPlaylistRef,
    loginPromptRef,
    createPlaylistButtonRef,
  };
};
