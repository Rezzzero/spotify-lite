import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { Playlist } from "@shared/types/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const usePlaylistInfo = () => {
  const [value, setValue] = useState("");
  const [openSearch, setOpenSearch] = useState(true);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { imageColors } = useGetColors(imageUrl);
  const { id } = useParams();
  const source = id?.startsWith("sp_") ? "supabase" : "spotify";
  const openPlaylist = true;
  const playlistName = playlist?.name ? playlist.name : "Мой плейлист №1";
  return {
    playlist,
    imageColors,
    openPlaylist,
    playlistName,
    value,
    setValue,
    openSearch,
    setOpenSearch,
  };
};
