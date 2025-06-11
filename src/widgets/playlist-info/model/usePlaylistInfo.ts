import { Route } from "@shared/constants/constants";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { Playlist } from "@shared/types/types";
import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const usePlaylistInfo = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [openSearch, setOpenSearch] = useState(true);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [playlistName, setPlaylistName] = useState(
    playlist?.name ? playlist.name : ""
  );
  const [playlistDescription, setPlaylistDescription] = useState(
    playlist?.description ? playlist.description : ""
  );
  const [playlistFormat, setPlaylistFormat] = useState("list");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [menuModal, setMenuModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [changeFormatModal, setChangeFormatModal] = useState(false);
  const [deletePlaylistModal, setDeletePlaylistModal] = useState(false);
  const menuModalRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const editModalRef = useRef<HTMLDivElement>(null);
  const changeFormatModalRef = useRef<HTMLDivElement>(null);
  const changeFormatButtonRef = useRef<HTMLButtonElement>(null);
  const { imageColors } = useGetColors(imageUrl);
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

        if (response.data.images[0].url) {
          setImageUrl(response.data.images[0].url);
        }

        setPlaylist(response.data);
        setPlaylistName(response.data.name);
        setPlaylistDescription(response.data.description);

        setLoading(false);
      } catch (error) {
        if ((error as AxiosError).status === 404) {
          navigate(Route.NOT_FOUND);
        }
        console.error("Error fetching playlist info:", error);
      }
    };

    fetch();
  }, [id, source, imageColors, navigate]);

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

  return {
    playlist,
    imageColors,
    value,
    setValue,
    openSearch,
    setOpenSearch,
    menuModal,
    setMenuModal,
    menuModalRef,
    menuButtonRef,
    editModal,
    setEditModal,
    editModalRef,
    playlistName,
    playlistDescription,
    loading,
    changeFormatModal,
    setChangeFormatModal,
    changeFormatModalRef,
    playlistFormat,
    setPlaylistFormat,
    changeFormatButtonRef,
    deletePlaylistModal,
    setDeletePlaylistModal,
    setPlaylistName,
    setPlaylistDescription,
    setPlaylist,
    setImageUrl,
  };
};
