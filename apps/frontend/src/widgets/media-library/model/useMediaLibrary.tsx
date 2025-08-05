import React, { useRef, useState, useMemo } from "react";
import { useUserStore } from "@app/store/user/useUser";
import { useNavigate } from "react-router-dom";
import { generateId } from "@shared/lib/id/generateId";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";
import { useClickOutside } from "@shared/lib/hooks/useClickOutside";
import { openMenuOrModal } from "@shared/lib/utils/openMenuOrModal";
import { closeMenuOrModal } from "@shared/lib/utils/closeMenuOrModal";
import { SupabaseAlbum, SupabasePlaylist } from "@shared/types/mediaLibrary";
import { Artist } from "@shared/types/types";

type MediaItemProps = {
  id: string;
  type: "artist" | "playlist" | "album";
  name: string;
  image: string;
  ownerName?: string;
  playlistPreviewImages?: { id: string; previewImage: string }[];
  added_at?: string;
  isOwner: boolean;
};
type LibraryItem =
  | SupabaseAlbum
  | SupabasePlaylist
  | (Artist & { added_at?: string });
export const useMediaLibrary = () => {
  const { user, userToArtistsSubs } = useUserStore();
  const { playlists, addPlaylist, playlistPreviewImages, albums } =
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
  const [miniCreatePlaylistModal, setMiniCreatePlaylistModal] = useState(false);
  const miniCreatePlaylistModalRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
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
  useClickOutside({
    refs: [miniCreatePlaylistModalRef],
    handler: () => setMiniCreatePlaylistModal(false),
    enabled: miniCreatePlaylistModal,
  });

  const handleOpenCreatePlaylistMenu = (e: React.MouseEvent<HTMLElement>) => {
    openMenuOrModal(e, setCreatePlaylistModal, setCreatePlaylistAnchor);
  };

  const handleOpenFilterMenu = (e: React.MouseEvent<HTMLElement>) => {
    openMenuOrModal(e, setIsFilterModalOpen, setFilterAnchor);
  };

  function isPlaylist(item: LibraryItem): item is SupabasePlaylist {
    return item.type === "playlist";
  }

  function isAlbum(item: LibraryItem): item is SupabaseAlbum {
    return item.type === "album";
  }

  const mergedLibraryList: LibraryItem[] = [
    ...playlists,
    ...userToArtistsSubs,
    ...albums,
  ];
  const normalizeLibraryList: MediaItemProps[] = mergedLibraryList.map(
    (item) => {
      if (isPlaylist(item)) {
        return {
          image: item.images?.[0]?.url ?? "",
          name: item.name,
          id: item.id,
          ownerName: item?.owner?.display_name,
          type: "playlist",
          playlistPreviewImages: playlistPreviewImages.filter(
            (image) => image.id === item.id
          ),
          added_at: item.added_at,
          isOwner: item?.owner?.id === user?.user.id,
        };
      } else if (isAlbum(item)) {
        return {
          image: item.images?.[0]?.url ?? "",
          name: item.name,
          id: item.id,
          ownerName: item?.owner?.name,
          type: "album",
          added_at: item.added_at,
          isOwner: false,
        };
      } else {
        return {
          image: item.images?.[0]?.url ?? "",
          name: item.name,
          id: item.id,
          type: "artist",
          added_at: item.added_at,
          isOwner: false,
        };
      }
    }
  );
  const sortedItems = useMemo(() => {
    if (!normalizeLibraryList) return [];

    switch (sortBy.value) {
      case "recent":
        return normalizeLibraryList;
      case "alphabet":
        return [...normalizeLibraryList].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      case "owner-name":
        return [...normalizeLibraryList].sort((a, b) => {
          const aHasOwner = !!a.ownerName;
          const bHasOwner = !!b.ownerName;

          if (aHasOwner && !bHasOwner) return -1;
          if (!aHasOwner && bHasOwner) return 1;
          if (!aHasOwner && !bHasOwner) return 0;

          return a.ownerName!.localeCompare(b.ownerName!);
        });
      case "recent-added":
        return [...normalizeLibraryList].sort(
          (a, b) =>
            new Date(b.added_at ?? 0).getTime() -
            new Date(a.added_at ?? 0).getTime()
        );
      default:
        return normalizeLibraryList;
    }
  }, [normalizeLibraryList, sortBy]);

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

  const handleOpenContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setPosition({ top: e.clientY, left: e.clientX });
    setMiniCreatePlaylistModal(true);
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
    sortedItems,
    handleOpenCreatePlaylistMenu,
    createPlaylistAnchor,
    handleOpenFilterMenu,
    filterAnchor,
    userToArtistsSubs,
    handleOpenContextMenu,
    miniCreatePlaylistModal,
    setMiniCreatePlaylistModal,
    miniCreatePlaylistModalRef,
    position,
  };
};
