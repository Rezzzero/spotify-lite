import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { useUserStore } from "@app/store/user/useUser";
import { API_URL } from "@shared/constants/constants";
import { UserToArtistSubs } from "@shared/types/user";
import { PlaylistData } from "@widgets/playlist-info/types/types";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useMediaMenu = ({
  closeMenu,
  isInProfile,
  setPlaylist,
  isPublic,
  mediaType,
  propId,
}: {
  closeMenu: () => void;
  isInProfile?: boolean | undefined;
  setPlaylist?: React.Dispatch<React.SetStateAction<PlaylistData | null>>;
  isPublic?: boolean | undefined;
  mediaType: string;
  propId?: string | undefined;
}) => {
  const { user, userToArtistsSubs } = useUserStore();
  const {
    playlists,
    changePublicStatus,
    removePlaylistFromUser,
    addPlaylistToUser,
    subscribeArtist,
    unsubscribeArtist,
  } = useMediaLibraryStore();
  const { id } = useParams();
  const [isPlaylistInProfile, setIsPlaylistInProfile] = useState<
    boolean | undefined
  >(isInProfile);
  const [isAddToMediaLibraryOpen, setIsAddToMediaLibraryOpen] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [shareAnchor, setShareAnchor] = useState<HTMLElement | null>(null);
  const [addToPlaylistAnchor, setAddToPlaylistAnchor] =
    useState<HTMLElement | null>(null);
  const shareModalRef = useRef<HTMLDivElement>(null);
  const closeShareTimeout = useRef<NodeJS.Timeout | null>(null);
  const closeAddToPlaylistTimout = useRef<NodeJS.Timeout | null>(null);
  const addToMediaLibraryRef = useRef<HTMLDivElement>(null);
  const currentId = propId ? propId : id;

  const handleRemovePlaylistFromMediaLibrary = async () => {
    try {
      await removePlaylistFromUser(currentId as string);
      closeMenu();
      toast(<p className="font-semibold">Удалено из медиатеки</p>, {
        style: { width: "210px" },
      });
    } catch (error) {
      console.error("Error removing playlist from media library:", error);
    }
  };

  const handleAddPlaylistToMediaLibrary = async () => {
    try {
      await addPlaylistToUser(currentId as string);
      closeMenu();
      toast(<p className="font-semibold">Добавлено в медиатеку</p>, {
        style: { width: "220px" },
      });
    } catch (error) {
      console.error("Error adding playlist to media library:", error);
    }
  };

  const togglePlaylistInProfileStatus = async () => {
    if (setPlaylist) {
      try {
        const response = await axios.patch(
          `${API_URL}/toggle-playlist-profile-status/${currentId}`,
          { status: !isInProfile, userId: user?.user.id }
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
        closeMenu();
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
    }
  };

  const handleChangePublicStatus = async () => {
    if (setPlaylist) {
      try {
        const response = await changePublicStatus(
          currentId as string,
          !isPublic
        );

        closeMenu();
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
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${mediaType}/${currentId}`
    );
    closeMenu();
    toast(<p>Ссылка скопирована в буфер обмена</p>, {
      style: { width: "310px" },
    });
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    timeoutRef: React.RefObject<NodeJS.Timeout | null>,
    setModal: (open: boolean) => void,
    setAnchor: (anchor: HTMLElement | null) => void,
    anchor: HTMLElement | null
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (!anchor) {
      setAnchor(e.currentTarget);
    }
    setModal(true);
  };

  const handleMouseLeave = (
    timeoutRef: React.RefObject<NodeJS.Timeout | null>,
    setModal: (open: boolean) => void,
    setAnchor: (anchor: HTMLElement | null) => void
  ) => {
    timeoutRef.current = setTimeout(() => {
      setModal(false);
      setAnchor(null);
    }, 200);
  };

  const handleShareMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    handleMouseEnter(
      e,
      closeShareTimeout,
      setShareModal,
      setShareAnchor,
      shareAnchor
    );
  };

  const handleShareMouseLeave = () => {
    handleMouseLeave(closeShareTimeout, setShareModal, setShareAnchor);
  };

  const handleAddToPlaylitMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    handleMouseEnter(
      e,
      closeAddToPlaylistTimout,
      setIsAddToMediaLibraryOpen,
      setAddToPlaylistAnchor,
      addToPlaylistAnchor
    );
  };

  const handleAddToPlaylistMouseLeave = () => {
    handleMouseLeave(
      closeAddToPlaylistTimout,
      setIsAddToMediaLibraryOpen,
      setAddToPlaylistAnchor
    );
  };

  const handleSubscribeArtist = async () => {
    if (!user || !currentId) return;
    const artistData: UserToArtistSubs = {
      artist_id: currentId,
      user_id: user.user.id,
    };
    subscribeArtist(artistData);
    closeMenu();
  };

  const handleUnsubscribeArtist = async () => {
    if (!user || !currentId) return;
    unsubscribeArtist(currentId);
    closeMenu();
  };

  return {
    playlists,
    userToArtistsSubs,
    handleRemovePlaylistFromMediaLibrary,
    currentId,
    isPlaylistInProfile,
    handleAddPlaylistToMediaLibrary,
    togglePlaylistInProfileStatus,
    handleChangePublicStatus,
    handleCopyLink,
    handleShareMouseLeave,
    handleShareMouseEnter,
    handleAddToPlaylitMouseEnter,
    handleAddToPlaylistMouseLeave,
    shareModal,
    shareModalRef,
    shareAnchor,
    isAddToMediaLibraryOpen,
    addToPlaylistAnchor,
    addToMediaLibraryRef,
    handleSubscribeArtist,
    handleUnsubscribeArtist,
  };
};
