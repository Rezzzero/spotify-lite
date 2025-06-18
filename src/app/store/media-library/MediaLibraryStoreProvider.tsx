import axios from "axios";
import { ReactNode, useState } from "react";
import { MediaLibraryContext } from "./MediaLibraryContext";
import { SupabasePlaylist } from "@shared/types/playlist";

export const MediaLibraryStoreProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [playlists, setPlaylists] = useState<SupabasePlaylist[]>([]);

  const fetchPlaylists = async (userId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/get-playlists-of-user`,
        {
          userId: userId,
        }
      );

      setPlaylists(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPlaylist = async (playlistData: SupabasePlaylist) => {
    try {
      await axios.post("http://localhost:3000/create-playlist", playlistData);
    } catch (error) {
      console.log(error);
    }

    setPlaylists([...playlists, playlistData]);
  };

  const removePlaylist = async (playlistId: string) => {
    try {
      await axios.delete(
        `http://localhost:3000/delete-supabase-playlist/${playlistId}`
      );
      setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
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
        `http://localhost:3000/update-supabase-playlist/${playlist.id}`,
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

  const uploadPlaylistImage = async (id: string, formData: FormData) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/upload-playlist-image/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      return response.data[0].images[0].url;
    } catch (error) {
      console.log(error);
    }
  };

  const changePublicStatus = async (id: string, isPublic: boolean) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/update-supabase-playlist/${id}`,
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

  return (
    <MediaLibraryContext.Provider
      value={{
        playlists,
        fetchPlaylists,
        addPlaylist,
        removePlaylist,
        updatePlaylist,
        uploadPlaylistImage,
        changePublicStatus,
      }}
    >
      {children}
    </MediaLibraryContext.Provider>
  );
};
