import { useEffect, useRef, useState } from "react";
import { useUserStore } from "src/app/store/user/useUser";

export const useMediaLibrary = () => {
  const { user } = useUserStore();
  const [createPlaylistModal, setCreatePlaylistModal] = useState(false);
  const [LoginPromptModal, setLoginPromptModal] = useState(false);

  const createPlaylistRef = useRef<HTMLDivElement>(null);
  const loginPromptRef = useRef<HTMLDivElement>(null);
  const createPlaylistButtonRef = useRef<HTMLButtonElement>(null);
  const showLoginPromptButtonRef = useRef<HTMLButtonElement>(null);

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
    if (!user) {
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
