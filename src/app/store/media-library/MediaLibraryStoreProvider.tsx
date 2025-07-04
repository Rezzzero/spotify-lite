import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { MediaLibraryContext } from "./MediaLibraryContext";
import { SupabasePlaylist } from "@shared/types/playlist";
import { API_URL } from "@shared/constants/constants";
import { useUserStore } from "../user/useUser";
import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";
import { usePlayerStore } from "../player/usePlayerStore";
import { TrackToAdd } from "@shared/types/types";

export const MediaLibraryStoreProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useUserStore();
  const { handleSelectTrack } = usePlayerStore();
  const [playlists, setPlaylists] = useState<SupabasePlaylist[]>([]);
  const [playlistPreviewImages, setPlaylistPreviewImages] = useState<
    { id: string; previewImage: string }[]
  >([]);

  useEffect(() => {
    if (user) {
      const fetchPlaylists = async (userId: string) => {
        try {
          const response = await axios.post(
            `${API_URL}/get-playlists-of-user`,
            {
              userId: userId,
            }
          );

          setPlaylists(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPlaylists(user.user.id);
    }
  }, [user]);

  const addPlaylist = async (playlistData: SupabasePlaylist) => {
    try {
      await axios.post(`${API_URL}/create-playlist`, playlistData);
    } catch (error) {
      console.log(error);
    }

    setPlaylists([...playlists, playlistData]);
  };

  const removePlaylist = async (playlistId: string) => {
    try {
      await axios.delete(`${API_URL}/delete-supabase-playlist/${playlistId}`, {
        data: {
          userId: user?.user.id,
        },
      });
      setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
    } catch (error) {
      console.log(error);
    }
  };

  const removePlaylistFromUser = async (playlistId: string) => {
    try {
      await axios.post(`${API_URL}/delete-playlist-from-user/${playlistId}`, {
        userId: user?.user.id,
      });
      setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
    } catch (error) {
      console.log(error);
    }
  };

  const addPlaylistToUser = async (playlistId: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/add-playlist/${playlistId}`,
        {
          user_id: user?.user.id,
        }
      );
      setPlaylists([...playlists, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePlaylist = async (playlist: {
    id: string;
    name: string;
    description: string;
  }) => {
    try {
      const response = await axios.put(
        `${API_URL}/update-supabase-playlist/${playlist.id}`,
        playlist
      );
      const playlistToUpdate = response.data[0] as SupabasePlaylist;
      if (!playlistToUpdate) {
        return;
      }
      setPlaylists(
        playlists.map((p) => (p.id === playlist.id ? playlistToUpdate : p))
      );
      return playlistToUpdate;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPlaylistImage = async (
    id: string,
    formData: FormData,
    previewImage: string
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/upload-playlist-image/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPlaylists(
        playlists.map((p) =>
          p.id === id
            ? {
                ...p,
                images: [response.data[0].images[0], ...p.images],
              }
            : p
        )
      );

      setPlaylistPreviewImages([
        ...playlistPreviewImages,
        { id, previewImage },
      ]);

      return response.data[0].images[0].url;
    } catch (error) {
      console.log(error);
    }
  };

  const changePublicStatus = async (id: string, isPublic: boolean) => {
    try {
      const response = await axios.put(
        `${API_URL}/update-supabase-playlist/${id}`,
        {
          public: isPublic,
        }
      );
      const playlistToUpdate = response.data[0] as SupabasePlaylist;
      if (!playlistToUpdate) {
        return;
      }
      setPlaylists(playlists.map((p) => (p.id === id ? playlistToUpdate : p)));
      return playlistToUpdate;
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlaylistImage = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/delete-playlist-image/${id}`);
      setPlaylistPreviewImages([
        ...playlistPreviewImages,
        { id, previewImage: PLAYLIST_PLACEHOLDER_URL },
      ]);
    } catch (error) {
      console.error("Error deleting playlist image:", error);
    }
  };

  return (
    <MediaLibraryContext.Provider
      value={{
        playlists,
        addPlaylist,
        removePlaylist,
        updatePlaylist,
        uploadPlaylistImage,
        changePublicStatus,
        playlistPreviewImages,
        setPlaylistPreviewImages,
        deletePlaylistImage,
        removePlaylistFromUser,
        addPlaylistToUser,
      }}
    >
      {children}
    </MediaLibraryContext.Provider>
  );
};
