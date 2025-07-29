import { SupabasePlaylist } from "@shared/types/mediaLibrary";
import { Playlist } from "@shared/types/types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";
import { useUserStore } from "@app/store/user/useUser";

export const useUserPlaylistsInfo = () => {
  const { userStoredOpenPlaylists, setUserStoredOpenPlaylists } =
    useUserStore();
  const [openedPlaylists, setOpenedPlaylists] = useState<
    SupabasePlaylist[] | (Playlist & { duration: number })[] | null
  >(userStoredOpenPlaylists);
  const { id } = useParams();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/get-open-user-playlists/${id}`
        );
        setUserStoredOpenPlaylists(response.data);
        setOpenedPlaylists(response.data);
      } catch {
        console.log("Ошибка при получении плейлистов пользователя");
      }
    };
    fetchPlaylists();
  }, [id]);

  return { openedPlaylists };
};
