import { useEffect, useRef, useState } from "react";
import { useUserStore } from "src/app/store/user/useUser";

export const useMediaLibrary = () => {
  const { user } = useUserStore();
  const [createPlaylistModal, setCreatePlaylistModal] = useState(false);
  const [LoginPromptModal, setLoginPromptModal] = useState(false);

  const createPlaylistRef = useRef<HTMLDivElement>(null);
  const loginPromptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        createPlaylistModal &&
        createPlaylistRef.current &&
        !createPlaylistRef.current.contains(event.target as Node)
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
    if (!user) {
      setLoginPromptModal(true);
    }
  };

  return {
    createPlaylistModal,
    setCreatePlaylistModal,
    handleCreatePlaylist,
    LoginPromptModal,
    setLoginPromptModal,
    createPlaylistRef,
    loginPromptRef,
  };
};
