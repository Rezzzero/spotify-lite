import { Route, API_URL } from "@shared/constants/constants";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PlaylistData } from "../types/types";
import { Track } from "@shared/types/types";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { useUserStore } from "@app/store/user/useUser";

export const usePlaylistInfo = () => {
  const { user } = useUserStore();
  const { playlists, removePlaylist, playlistPreviewImages } =
    useMediaLibraryStore();
  const [loading, setLoading] = useState(false);
  const [openSearch, setOpenSearch] = useState(true);
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlistFormat, setPlaylistFormat] = useState("list");
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [changeFormatModal, setChangeFormatModal] = useState(false);
  const [deletePlaylistModal, setDeletePlaylistModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const menuModalRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const editModalRef = useRef<HTMLDivElement>(null);
  const changeFormatModalRef = useRef<HTMLDivElement>(null);
  const changeFormatButtonRef = useRef<HTMLButtonElement>(null);
  const { imageColors } = useGetColors(playlistData?.imageUrl || null);
  const { id } = useParams();
  const source = id?.startsWith("sp_") ? "supabase" : "spotify";
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const endpoint =
      source === "supabase" ? "get-supabase-playlist" : "get-playlist";

    const fetch = async () => {
      try {
        const response = await axios.get(`${API_URL}/${endpoint}/${id}`, {
          withCredentials: true,
        });

        setPlaylistData({
          playlist: response.data,
          playlistName: response.data.name,
          playlistDescription: response.data.description,
          imageUrl:
            response.data.images[0]?.url ||
            response.data.tracks?.[0]?.album?.images?.[0]?.url ||
            "",
        });

        if (response.data.tracks) {
          setTracks(response.data.tracks);
        }

        setIsOwner(response.data.user_id === user?.user.id);

        setLoading(false);
      } catch (error) {
        if ((error as AxiosError).status === 404) {
          navigate(Route.NOT_FOUND);
        }
        console.error("Error fetching playlist info:", error);
      }
    };

    fetch();
  }, [id, source, navigate, user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuModal &&
        menuModalRef.current &&
        !menuModalRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current?.contains(event.target as Node)
      ) {
        setMenuModal(false);
      }

      if (
        editModal &&
        editModalRef.current &&
        !editModalRef.current.contains(event.target as Node)
      ) {
        setEditModal(false);
      }

      if (
        changeFormatModal &&
        changeFormatModalRef.current &&
        !changeFormatModalRef.current.contains(event.target as Node) &&
        changeFormatButtonRef.current &&
        !changeFormatButtonRef.current?.contains(event.target as Node)
      ) {
        setChangeFormatModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuModal, editModal, changeFormatModal]);

  const handleUpdateDuration = (trackDuration: number, isAdd: boolean) => {
    setPlaylistData((prevPlaylistData) => {
      if (!prevPlaylistData) return null;

      const currentDuration = prevPlaylistData.playlist.duration || 0;
      const newDuration = isAdd
        ? currentDuration + trackDuration
        : Math.max(0, currentDuration - trackDuration);

      return {
        ...prevPlaylistData,
        playlist: {
          ...prevPlaylistData.playlist,
          duration: newDuration,
        },
      };
    });
  };

  const handleDeletePlaylistFromMediaLibrary = async (id: string) => {
    if (!user) return;
    try {
      removePlaylist(id);

      navigate(Route.HOME);
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const handleListenPlaylist = () => {
    setIsPlaying((prev) => !prev);
  };

  return {
    playlists,
    playlistPreviewImages,
    playlistData,
    imageColors,
    openSearch,
    setOpenSearch,
    menuModal,
    setMenuModal,
    menuModalRef,
    menuButtonRef,
    editModal,
    setEditModal,
    editModalRef,
    loading,
    changeFormatModal,
    setChangeFormatModal,
    changeFormatModalRef,
    playlistFormat,
    setPlaylistFormat,
    changeFormatButtonRef,
    deletePlaylistModal,
    setDeletePlaylistModal,
    setPlaylistData,
    tracks,
    setTracks,
    handleUpdateDuration,
    handleDeletePlaylistFromMediaLibrary,
    isOwner,
    handleListenPlaylist,
    isPlaying,
  };
};
