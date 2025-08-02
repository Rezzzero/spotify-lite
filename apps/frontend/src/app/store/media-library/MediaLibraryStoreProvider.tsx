import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { MediaLibraryContext } from "./MediaLibraryContext";
import { SupabaseAlbum, SupabasePlaylist } from "@shared/types/mediaLibrary";
import { API_URL } from "@shared/constants/constants";
import { useUserStore } from "../user/useUser";
import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";
import { UserToArtistSubs } from "@shared/types/user";
import { toast } from "react-toastify";

export const MediaLibraryStoreProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user, userToArtistsSubs, setUserToArtistsSubs } = useUserStore();
  const [playlists, setPlaylists] = useState<SupabasePlaylist[]>([]);
  const [albums, setAlbums] = useState<SupabaseAlbum[]>([]);
  const [playlistPreviewImages, setPlaylistPreviewImages] = useState<
    { id: string; previewImage: string }[]
  >([]);
  useEffect(() => {
    if (user) {
      const fetchPlaylists = async (userId: string) => {
        try {
          const response = await axios.post(
            `${API_URL}/get-media-library-of-user`,
            {
              userId: userId,
            }
          );
          setPlaylists(response.data.playlists);
          setAlbums(response.data.albums);
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
      setPlaylists([...playlists, playlistData]);
      toast(<p className="font-semibold">Добавлено в медиатеку</p>, {
        style: { width: "220px" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removePlaylist = async (playlistId: string) => {
    try {
      await axios.delete(`${API_URL}/delete-supabase-playlist/${playlistId}`, {
        data: {
          userId: user?.user.id,
        },
      });
      setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
      toast(<p className="font-semibold">Удалено из медиатеки</p>, {
        style: { width: "210px" },
      });
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
      toast(<p className="font-semibold">Удалено из медиатеки</p>, {
        style: { width: "210px" },
      });
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
      toast(<p className="font-semibold">Добавлено в медиатеку</p>, {
        style: { width: "220px" },
      });
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
      const message = !isPublic
        ? "Теперь это открытый плейлист"
        : "Теперь это закрытый плейлист";
      toast(<p className="font-semibold">{message}</p>, {
        style: { width: "280px" },
      });
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

  const subscribeArtist = async (artistData: UserToArtistSubs) => {
    try {
      const response = await axios.post(
        `${API_URL}/subscribe-artist`,
        artistData
      );
      setUserToArtistsSubs([...userToArtistsSubs, response.data]);
    } catch {
      console.log("Ошибка при попытке подписаться");
    }
  };

  const unsubscribeArtist = async (artistId: string) => {
    if (!user) return;
    try {
      await axios.post(`${API_URL}/unsubscribe-artist/${artistId}`, {
        userId: user.user.id,
      });
      setUserToArtistsSubs(
        userToArtistsSubs.filter((artist) => artist.id !== artistId)
      );
    } catch {
      console.log("Ошибка при попытке отписаться");
    }
  };

  const addAlbum = async (albumData: SupabaseAlbum) => {
    if (!user) return;
    try {
      const { data } = await axios.post(`${API_URL}/add-album-to-user`, {
        albumData,
        userId: user?.user.id,
      });
      setAlbums([...albums, data]);
      toast(<p className="font-semibold">Добавлено в медиатеку</p>, {
        style: { width: "220px" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeAlbum = async (albumdId: string) => {
    if (!user) return;
    try {
      await axios.post(`${API_URL}/remove-album-from-user`, {
        albumId: albumdId,
        userId: user?.user.id,
      });
      setAlbums(albums.filter((album) => album.id !== albumdId));
      toast(<p className="font-semibold">Удалено из медиатеки</p>, {
        style: { width: "210px" },
      });
    } catch (error) {
      console.log(error);
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
        subscribeArtist,
        unsubscribeArtist,
        albums,
        addAlbum,
        removeAlbum,
      }}
    >
      {children}
    </MediaLibraryContext.Provider>
  );
};
