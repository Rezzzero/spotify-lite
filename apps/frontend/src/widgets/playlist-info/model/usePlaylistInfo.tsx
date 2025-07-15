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
import { toast } from "react-toastify";
import { useClickOutside } from "@shared/lib/hooks/useClickOutside";

export const usePlaylistInfo = () => {
  const { user } = useUserStore();
  const {
    playlists,
    playlistPreviewImages,
    removePlaylistFromUser,
    addPlaylistToUser,
  } = useMediaLibraryStore();
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
  const deleteModalRef = useRef<HTMLDivElement>(null);
  const { imageColors } = useGetColors(playlistData?.imageUrl || null);
  const { id } = useParams();
  const source = id?.startsWith("sp_") ? "supabase" : "spotify";
  const navigate = useNavigate();
  useClickOutside({
    refs: [menuModalRef, menuButtonRef],
    handler: () => setMenuModal(false),
    enabled: menuModal,
  });
  useClickOutside({
    refs: [editModalRef],
    handler: () => setEditModal(false),
    enabled: editModal,
  });
  useClickOutside({
    refs: [changeFormatModalRef, changeFormatButtonRef],
    handler: () => setChangeFormatModal(false),
    enabled: changeFormatModal,
  });
  useClickOutside({
    refs: [deleteModalRef],
    handler: () => setDeletePlaylistModal(false),
    enabled: deletePlaylistModal,
  });

  useEffect(() => {
    setLoading(true);
    const endpoint =
      source === "supabase" ? "get-supabase-playlist" : "get-playlist";

    const fetch = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/${endpoint}/${id}`,
          { userId: user?.user.id },
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
      await removePlaylistFromUser(id);
      toast(<p className="font-semibold">Удалено из медиатеки</p>, {
        style: { width: "210px" },
      });
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const handleAddPlaylistToMediaLibrary = async (id: string) => {
    if (!user) return;
    try {
      await addPlaylistToUser(id);
      toast(<p className="font-semibold">Добавлено в медиатеку</p>, {
        style: { width: "220px" },
      });
    } catch (error) {
      console.error("Error adding playlist to media library:", error);
    }
  };

  const handleListenPlaylist = () => {
    setIsPlaying((prev) => !prev);
  };

  return {
    user,
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
    handleAddPlaylistToMediaLibrary,
    deleteModalRef,
  };
};
