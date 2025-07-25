import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Album, Artist, Playlist, Track } from "@shared/types/types";
import { artistMusicFilterList, API_URL } from "@shared/constants/constants";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { useClickOutside } from "@shared/lib/hooks/useClickOutside";
import { closeMenuOrModal } from "@shared/lib/utils/closeMenuOrModal";
import { openMenuOrModal } from "@shared/lib/utils/openMenuOrModal";
import { toast } from "react-toastify";
import { useUserStore } from "@app/store/user/useUser";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";

interface ArtistInfoType {
  artist: Artist;
  topTracks: Track[];
  albumsAndSingles: Album[];
  otherArtists: Artist[];
  moreWithArtist: Album[];
  playlists: Playlist[];
}

export const useArtistInfo = () => {
  const { user, userToArtistsSubs } = useUserStore();
  const {
    removePlaylistFromUser,
    addPlaylistToUser,
    subscribeArtist,
    unsubscribeArtist,
  } = useMediaLibraryStore();
  const [artistInfo, setArtistInfo] = useState<ArtistInfoType | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { imageColors } = useGetColors(imageUrl);
  const { id } = useParams();
  const [selectedFilter, setSelectedFilter] = useState(
    artistMusicFilterList.all.path
  );
  const [filtredAlbumsAndSingles, setFiltredAlbumsAndSingles] = useState<
    Album[]
  >([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [menuAnchor, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const menuModalRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside({
    refs: [menuModalRef, menuButtonRef],
    handler: () => closeMenuOrModal(setMenuModal, setMenuAnchorEl),
    enabled: menuModal,
  });

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement | null>) => {
    openMenuOrModal(e, setMenuModal, setMenuAnchorEl);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/artist/${id}`);
        const data: ArtistInfoType = response.data;
        setArtistInfo(data);
        setFiltredAlbumsAndSingles(data.albumsAndSingles);
        if (data.artist.images[1].url) {
          setImageUrl(data.artist.images[1].url);
        }
        if (user) {
          setIsSubscribed(
            userToArtistsSubs.some((artist) => artist.id === data.artist.id)
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artist info:", error);
      }
    };
    fetch();
  }, [id, user]);

  const handleChangeFilter = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === "all") {
      setFiltredAlbumsAndSingles(artistInfo?.albumsAndSingles || []);
    }
    if (filter === "album" || filter === "single") {
      setFiltredAlbumsAndSingles(
        artistInfo?.albumsAndSingles.filter(
          (album) => album.album_type === filter
        ) || []
      );
    }
  };

  const handleDeletePlaylistFromMediaLibrary = async (id: string) => {
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

  const handleAddPlaylistToMediaLibrary = async (id: string) => {
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

  const handleSubscribe = async () => {
    if (!user || !artistInfo) return;
    const artistData = {
      artist_id: artistInfo.artist.id,
      user_id: user.user.id,
    };
    subscribeArtist(artistData);
    setIsSubscribed(true);
  };

  const handleUnsubscribe = async () => {
    if (!user || !artistInfo) return;
    unsubscribeArtist(artistInfo.artist.id);
    setIsSubscribed(false);
  };

  return {
    artistInfo,
    imageColors,
    handleChangeFilter,
    selectedFilter,
    filtredAlbumsAndSingles,
    isPlaying,
    handleListenPlaylist,
    loading,
    menuModal,
    setMenuModal,
    menuModalRef,
    menuButtonRef,
    menuAnchor,
    handleOpenMenu,
    handleDeletePlaylistFromMediaLibrary,
    handleAddPlaylistToMediaLibrary,
    handleSubscribe,
    handleUnsubscribe,
    isSubscribed,
  };
};
