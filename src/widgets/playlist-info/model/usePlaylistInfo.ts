import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { Playlist } from "@shared/types/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const usePlaylistInfo = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [openSearch, setOpenSearch] = useState(true);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [playlistNewName, setPlaylistNewName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState(
    playlist?.description ? playlist.description : ""
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [menuModal, setMenuModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const menuModalRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const editModalRef = useRef<HTMLDivElement>(null);
  const { imageColors } = useGetColors(imageUrl);
  const { id } = useParams();
  const source = id?.startsWith("sp_") ? "supabase" : "spotify";
  const openPlaylist = true;

  useEffect(() => {
    setLoading(true);
    const endpoint =
      source === "supabase" ? "get-supabase-playlist" : "get-playlist";
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/${endpoint}/${id}`
        );

        setPlaylist(response.data);
        setPlaylistNewName(response.data.title);
        setPlaylistDescription(response.data.description);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlist info:", error);
      }
    };

    fetch();
  }, [id, source]);

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuModal]);

  const handleChangePlaylistName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistNewName(e.target.value);
  };

  const handleChangePlaylistDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPlaylistDescription(e.target.value);
  };

  return {
    playlist,
    imageColors,
    openPlaylist,
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
    playlistNewName,
    playlistDescription,
    handleChangePlaylistName,
    handleChangePlaylistDescription,
    loading,
  };
};
