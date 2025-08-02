import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Album, Artist } from "@shared/types/types";
import { useParams } from "react-router-dom";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { API_URL } from "@shared/constants/constants";
import { useUserStore } from "@app/store/user/useUser";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { openMenuOrModal } from "@shared/lib/utils/openMenuOrModal";
import { useClickOutside } from "@shared/lib/hooks/useClickOutside";
import { closeMenuOrModal } from "@shared/lib/utils/closeMenuOrModal";

interface AlbumDataType {
  album: Album;
  artist: Artist;
  otherAlbums: Album[];
}

export const useAlbumInfo = () => {
  const { user } = useUserStore();
  const { addAlbum, removeAlbum } = useMediaLibraryStore();
  const [albumData, setAlbumData] = useState<AlbumDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { imageColors } = useGetColors(imageUrl);
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [changeFormatModal, setChangeFormatModal] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [changeFormatAnchor, setChangeFormatAnchor] =
    useState<HTMLElement | null>(null);
  const [format, setFormat] = useState("compact");
  const menuModalRef = useRef<HTMLDivElement>(null);
  const changeFormatModalRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const changeFormatButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside({
    refs: [menuModalRef, menuButtonRef],
    handler: () => closeMenuOrModal(setMenuModal, setMenuAnchor),
    enabled: menuModal,
  });
  useClickOutside({
    refs: [changeFormatModalRef, changeFormatButtonRef],
    handler: () =>
      closeMenuOrModal(setChangeFormatModal, setChangeFormatAnchor),
    enabled: changeFormatModal,
  });

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement | null>) => {
    openMenuOrModal(e, setMenuModal, setMenuAnchor);
  };

  const handleOpenFormatChangeMenu = (
    e: React.MouseEvent<HTMLElement | null>
  ) => {
    openMenuOrModal(e, setChangeFormatModal, setChangeFormatAnchor);
  };

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
      await removeAlbum(id);
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const handleAddToMediaLibrary = async () => {
    if (!user || !albumData) return;
    try {
      await addAlbum(albumData.album.id);
    } catch (error) {
      console.error("Error adding playlist to media library:", error);
    }
  };

  const handleListenPlaylist = () => {
    setIsPlaying((prev) => !prev);
  };

  return {
    menuModal,
    albumData,
    imageColors,
    loading,
    user,
    changeFormatModal,
    changeFormatButtonRef,
    changeFormatModalRef,
    isPlaying,
    menuModalRef,
    menuButtonRef,
    menuAnchor,
    changeFormatAnchor,
    format,
    setFormat,
    handleOpenMenu,
    handleOpenFormatChangeMenu,
    handleDeleteFromMediaLibrary,
    handleAddToMediaLibrary,
    setMenuModal,
    setChangeFormatModal,
    handleListenPlaylist,
  };
};
