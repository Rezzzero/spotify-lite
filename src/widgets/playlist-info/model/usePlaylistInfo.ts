import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { Playlist } from "@shared/types/types";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const usePlaylistInfo = () => {
  const [value, setValue] = useState("");
  const [openSearch, setOpenSearch] = useState(true);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [playlistNewName, setPlaylistNewName] = useState(
    playlist?.name ? playlist.name : "Мой плейлист №1"
  );
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
  const playlistName = playlist?.name ? playlist.name : "Мой плейлист №1";

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
    playlistName,
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
  };
};
