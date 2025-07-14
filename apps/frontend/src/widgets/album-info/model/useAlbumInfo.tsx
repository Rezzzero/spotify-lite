import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Album, Artist } from "@shared/types/types";
import { useParams } from "react-router-dom";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { API_URL } from "@shared/constants/constants";
import { useUserStore } from "@app/store/user/useUser";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { toast } from "react-toastify";

interface AlbumDataType {
  album: Album;
  artist: Artist;
  otherAlbums: Album[];
}

export const useAlbumInfo = () => {
  const { user } = useUserStore();
  const { removePlaylistFromUser, addPlaylistToUser } = useMediaLibraryStore();
  const [albumData, setAlbumData] = useState<AlbumDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { imageColors } = useGetColors(imageUrl);
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [changeFormatModal, setChangeFormatModal] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const changeFormatButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/album/${id}`);
        const data: AlbumDataType = response.data;
        setAlbumData(data);
        if (data.album.images[1].url) {
          setImageUrl(data.album.images[1].url);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching album info:", error);
      }
    };

    fetch();
  }, [id]);

  const handleDeleteFromMediaLibrary = async (id: string) => {
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

  const handleAddToMediaLibrary = async (id: string) => {
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
    albumData,
    imageColors,
    loading,
    user,
    changeFormatButtonRef,
    isPlaying,
    menuButtonRef,
    handleDeleteFromMediaLibrary,
    handleAddToMediaLibrary,
    setMenuModal,
    setChangeFormatModal,
    handleListenPlaylist,
  };
};
