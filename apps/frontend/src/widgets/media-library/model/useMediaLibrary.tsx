import React, { useRef, useState, useMemo } from "react";
import { useUserStore } from "@app/store/user/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { generateId } from "@shared/lib/id/generateId";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";
import { toast } from "react-toastify";
import { useClickOutside } from "@shared/lib/hooks/useClickOutside";
import { openMenuOrModal } from "@shared/lib/utils/openMenuOrModal";
import { closeMenuOrModal } from "@shared/lib/utils/closeMenuOrModal";

export const useMediaLibrary = () => {
  const { user, userToArtistsSubs } = useUserStore();
  const { playlists, addPlaylist, playlistPreviewImages } =
    useMediaLibraryStore();
  const [createPlaylistModal, setCreatePlaylistModal] = useState(false);
  const [LoginPromptModal, setLoginPromptModal] = useState(false);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(true);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [libraryFormat, setLibraryFormat] = useState("list");
  const [sortBy, setSortBy] = useState({ name: "Недавние", value: "recent" });
  const navigate = useNavigate();
  const createPlaylistRef = useRef<HTMLDivElement>(null);
  const loginPromptRef = useRef<HTMLDivElement>(null);
  const createPlaylistButtonRef = useRef<HTMLButtonElement>(null);
  const filterModalRef = useRef<HTMLDivElement>(null);
  const filterModalButtonRef = useRef<HTMLButtonElement>(null);
  const [createPlaylistAnchor, setCreatePlaylistAnchor] =
    useState<HTMLElement | null>(null);
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);
  const { id } = useParams();
  useClickOutside({
    refs: [createPlaylistRef, createPlaylistButtonRef],
    handler: () =>
      closeMenuOrModal(setCreatePlaylistModal, setCreatePlaylistAnchor),
    enabled: createPlaylistModal,
  });
  useClickOutside({
    refs: [loginPromptRef],
    handler: () => setLoginPromptModal(false),
    enabled: LoginPromptModal,
  });
  useClickOutside({
    refs: [filterModalRef, filterModalButtonRef],
    handler: () => closeMenuOrModal(setIsFilterModalOpen, setFilterAnchor),
    enabled: isFilterModalOpen,
  });

  const handleOpenCreatePlaylistMenu = (e: React.MouseEvent<HTMLElement>) => {
    openMenuOrModal(e, setCreatePlaylistModal, setCreatePlaylistAnchor);
  };

  const handleOpenFilterMenu = (e: React.MouseEvent<HTMLElement>) => {
    openMenuOrModal(e, setIsFilterModalOpen, setFilterAnchor);
  };

  const sortedPlaylists = useMemo(() => {
    if (!playlists) return [];

    switch (sortBy.value) {
      case "recent":
        return playlists;
      case "alphabet":
        return [...playlists].sort((a, b) => a.name.localeCompare(b.name));
      case "owner-name":
        return [...playlists].sort(
          (a, b) =>
            a.owner?.display_name?.localeCompare(b.owner?.display_name || "") ||
            0
        );
      case "recent-added":
        return [...playlists].sort(
          (a, b) =>
            new Date(b.added_at ?? 0).getTime() -
            new Date(a.added_at ?? 0).getTime()
        );
      default:
        return playlists;
    }
  }, [playlists, sortBy]);

  const handleCreatePlaylist = async () => {
    closeMenuOrModal(setCreatePlaylistModal, setCreatePlaylistAnchor);

    if (user) {
      const id = generateId();

      const playlistData = {
        id: id,
        user_id: user.user.id,
        name: "Новый плейлист",
        description: "",
        public: true,
        images: [
          {
            url: PLAYLIST_PLACEHOLDER_URL,
          },
        ],
        owner: {
          display_name: user.user.user_metadata.userName,
        },
        show_in_profile: false,
      };

      try {
        await addPlaylist(playlistData);
        toast(<p className="font-semibold">Добавлено в медиатеку</p>, {
          style: { width: "220px" },
        });
      } catch (error) {
        console.log(error);
      }

      navigate(`/playlist/${id}`);
    } else {
      setLoginPromptModal(true);
    }
  };

  const handleChangeLibraryFormat = (format: string) => {
    setLibraryFormat(format);
  };

  const handleChangeSortBy = (sort: { name: string; value: string }) => {
    setSortBy(sort);
  };

  return {
    user,
    createPlaylistModal,
    setCreatePlaylistModal,
    handleCreatePlaylist,
    LoginPromptModal,
    setLoginPromptModal,
    createPlaylistRef,
    loginPromptRef,
    createPlaylistButtonRef,
    playlists,
    id,
    isMediaLibraryOpen,
    setIsMediaLibraryOpen,
    playlistPreviewImages,
    libraryFormat,
    handleChangeLibraryFormat,
    sortBy,
    handleChangeSortBy,
    isFilterModalOpen,
    filterModalRef,
    filterModalButtonRef,
    sortedPlaylists,
    handleOpenCreatePlaylistMenu,
    createPlaylistAnchor,
    handleOpenFilterMenu,
    filterAnchor,
    userToArtistsSubs,
  };
};
