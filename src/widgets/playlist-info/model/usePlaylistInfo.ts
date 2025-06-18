import { Route } from "@shared/constants/constants";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PlaylistData } from "../types/types";
import { Track } from "@shared/types/types";
import { useMediaLibraryStore } from "src/app/store/media-library/useMediaLibraryStore";
import { useUserStore } from "src/app/store/user/useUser";

export const usePlaylistInfo = () => {
  const { user } = useUserStore();
  const { playlists, removePlaylist } = useMediaLibraryStore();
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
        const response = await axios.get(
          `http://localhost:3000/${endpoint}/${id}`,
          {
            withCredentials: true,
          }
        );

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

        setLoading(false);
      } catch (error) {
        if ((error as AxiosError).status === 404) {
          navigate(Route.NOT_FOUND);
        }
        console.error("Error fetching playlist info:", error);
      }
    };

    fetch();
  }, [id, source, navigate]);

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
      return {
        ...prevPlaylistData,
        playlist: {
          ...prevPlaylistData.playlist,
          duration: isAdd
            ? prevPlaylistData.playlist.duration + trackDuration
            : prevPlaylistData.playlist.duration - trackDuration,
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

  const isOwnPlaylist = () => {
    if (!user || !playlistData?.playlist) return false;

    if ("userId" in playlistData.playlist) {
      return user.user.id === playlistData.playlist.userId;
    }

    return (
      user.user.id === (playlistData.playlist.owner as { id?: string })?.id
    );
  };

  const handleListenPlaylist = () => {
    setIsPlaying((prev) => !prev);
  };

  return {
    playlists,
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
    isOwnPlaylist,
    handleListenPlaylist,
    isPlaying,
  };
};
