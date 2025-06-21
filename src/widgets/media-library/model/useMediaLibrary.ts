import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@app/store/user/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { generateId } from "@shared/lib/id/generateId";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";

export const useMediaLibrary = () => {
  const { user } = useUserStore();
  const { playlists, addPlaylist, playlistPreviewImages } =
    useMediaLibraryStore();
  const [createPlaylistModal, setCreatePlaylistModal] = useState(false);
  const [LoginPromptModal, setLoginPromptModal] = useState(false);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(true);
  const navigate = useNavigate();
  const createPlaylistRef = useRef<HTMLDivElement>(null);
  const loginPromptRef = useRef<HTMLDivElement>(null);
  const createPlaylistButtonRef = useRef<HTMLButtonElement>(null);
  const { id } = useParams();

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

  const handleCreatePlaylist = async () => {
    setCreatePlaylistModal(false);

    if (user) {
      const id = generateId();

      const playlistData = {
        id: id,
        userId: user.user.id,
        name: "Новый плейлист",
        description: "",
        public: true,
        images: [
          {
            url: PLAYLIST_PLACEHOLDER_URL,
          },
        ],
        owner: {
          display_name: user.user.user_metadata.userName,
        },
      };

      try {
        await addPlaylist(playlistData);
      } catch (error) {
        console.log(error);
      }

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
    playlists,
    id,
    isMediaLibraryOpen,
    setIsMediaLibraryOpen,
    playlistPreviewImages,
  };
};
