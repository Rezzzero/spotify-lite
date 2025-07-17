import { PlaylistData } from "@widgets/playlist-info/types/types";
import { useParams } from "react-router-dom";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";
import { SupabasePlaylist } from "@shared/types/playlist";
import { Playlist } from "@shared/types/types";
import { useUserStore } from "@app/store/user/useUser";

export const usePlaylistMenu = ({
  isPublic,
  closeModal,
  setPlaylist,
  playlist,
}: {
  isPublic: boolean | undefined;
  closeModal: () => void;
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistData | null>>;
  playlist: SupabasePlaylist | (Playlist & { duration: number }) | undefined;
}) => {
  const { user } = useUserStore();
  const { id } = useParams();
  const {
    playlists,
    changePublicStatus,
    removePlaylistFromUser,
    addPlaylistToUser,
  } = useMediaLibraryStore();
  const [isPlaylistInProfile, setIsPlaylistInProfile] = useState<
    boolean | undefined
  >(playlist?.show_in_profile);
  const [shareModal, setShareModal] = useState(false);
  const shareModalRef = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleChangePublicStatus = async () => {
    try {
      const response = await changePublicStatus(id as string, !isPublic);

      closeModal();
      if (response) {
        setPlaylist({
          playlist: response,
          playlistName: response.name,
          playlistDescription: response.description,
          imageUrl: response.images[0].url,
        });
      }
      const message = !isPublic
        ? "Теперь это открытый плейлист"
        : "Теперь это закрытый плейлист";
      toast(<p className="font-semibold">{message}</p>, {
        style: { width: "280px" },
      });
    } catch (error) {
      console.error("Error changing public status:", error);
    }
  };

  const handleRemovePlaylistFromMediaLibrary = async () => {
    try {
      await removePlaylistFromUser(id as string);
      closeModal();
      toast(<p className="font-semibold">Удалено из медиатеки</p>, {
        style: { width: "210px" },
      });
    } catch (error) {
      console.error("Error removing playlist from media library:", error);
    }
  };

  const handleAddPlaylistToMediaLibrary = async () => {
    try {
      await addPlaylistToUser(id as string);
      closeModal();
      toast(<p className="font-semibold">Добавлено в медиатеку</p>, {
        style: { width: "220px" },
      });
    } catch (error) {
      console.error("Error adding playlist to media library:", error);
    }
  };

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setShareModal(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setShareModal(false);
    }, 200);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/playlist/${id}`);
    closeModal();
    toast(<p>Ссылка скопирована в буфер обмена</p>, {
      style: { width: "310px" },
    });
  };

  const togglePlaylistInProfileStatus = async () => {
    try {
      const response = await axios.patch(
        `${API_URL}/toggle-playlist-profile-status/${id}`,
        { status: !playlist?.show_in_profile, userId: user?.user.id }
      );
      setPlaylist((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          playlist: {
            ...prev.playlist,
            show_in_profile: response.data.show_in_profile,
          },
        };
      });
      setIsPlaylistInProfile(response.data.show_in_profile);
      closeModal();
      if (response.data.show_in_profile) {
        toast(
          <p className="font-semibold">
            Теперь плейлист показывается в твоем профиле
          </p>,
          {
            style: { width: "425px" },
          }
        );
      } else {
        toast(
          <p className="font-semibold">
            Плейлист больше не показывается в твоем профиле
          </p>,
          {
            style: { width: "455px" },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    playlist,
    playlists,
    isPlaylistInProfile,
    handleChangePublicStatus,
    handleRemovePlaylistFromMediaLibrary,
    id,
    handleAddPlaylistToMediaLibrary,
    handleMouseEnter,
    handleMouseLeave,
    shareModalRef,
    shareModal,
    handleCopyLink,
    togglePlaylistInProfileStatus,
  };
};
