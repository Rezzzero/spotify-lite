import { useEffect, useRef, useState } from "react";
import { useUserStore } from "src/app/store/user/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { generateId } from "@shared/lib/id/generateId";
import axios from "axios";
import { Playlist } from "@shared/types/types";

export const useMediaLibrary = () => {
  const { user } = useUserStore();
  const [playlists, setPlaylist] = useState<Playlist[]>([]);
  const [createPlaylistModal, setCreatePlaylistModal] = useState(false);
  const [LoginPromptModal, setLoginPromptModal] = useState(false);
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

  useEffect(() => {
    if (user) {
      const userId = user.user.id;

      const fetchPlaylists = async () => {
        try {
          const response = await axios.post(
            `http://localhost:3000/get-playlists-of-user`,
            {
              userId: userId,
            }
          );

          setPlaylist(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchPlaylists();
    }
  }, [user]);

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
            url: "",
          },
        ],
        owner: {
          id: user.user.id,
          display_name: user.user.user_metadata.userName,
        },
      };

      try {
        await axios.post("http://localhost:3000/create-playlist", playlistData);
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
  };
};
