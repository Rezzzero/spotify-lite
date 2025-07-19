import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { Album, Artist, Track } from "@shared/types/types";
import { API_URL } from "@shared/constants/constants";
import { useClickOutside } from "@shared/lib/hooks/useClickOutside";
import { closeMenuOrModal } from "@shared/lib/utils/closeMenuOrModal";
import { openMenuOrModal } from "@shared/lib/utils/openMenuOrModal";

interface TrackDataType {
  track: Track;
  artist: Artist;
  topTracks: Track[];
  albumsAndSingles: Album[];
}

export const useTrackInfo = () => {
  const [trackData, setTrackData] = useState<TrackDataType | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [singles, setSingles] = useState<Album[]>([]);
  const { imageColors } = useGetColors(imageUrl);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [menuModal, setMenuModal] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const menuModalRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useClickOutside({
    refs: [menuModalRef, menuButtonRef],
    handler: () => closeMenuOrModal(setMenuModal, setMenuAnchor),
    enabled: menuModal,
  });

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement | null>) => {
    openMenuOrModal(e, setMenuModal, setMenuAnchor);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/track/${id}`);
        const data: TrackDataType = response.data;
        setTrackData(data);
        setAlbums(
          data.albumsAndSingles.filter((album) => album.album_type === "album")
        );
        setSingles(
          data.albumsAndSingles.filter((album) => album.album_type === "single")
        );
        if (data.track.album.images[1].url) {
          setImageUrl(data.track.album.images[1].url);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching track info:", error);
      }
    };
    fetch();
  }, [id]);

  const handleListenPlaylist = () => {
    setIsPlaying((prev) => !prev);
  };

  return {
    trackData,
    albums,
    singles,
    imageColors,
    loading,
    menuModal,
    menuAnchor,
    menuModalRef,
    menuButtonRef,
    isPlaying,
    handleListenPlaylist,
    handleOpenMenu,
  };
};
