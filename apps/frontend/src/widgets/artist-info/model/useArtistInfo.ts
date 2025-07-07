import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Album, Artist, Playlist, Track } from "@shared/types/types";
import { artistMusicFilterList, API_URL } from "@shared/constants/constants";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
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
  const { user } = useUserStore();
  const { playlists } = useMediaLibraryStore();
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artist info:", error);
      }
    };
    fetch();
  }, [id]);

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

  return {
    artistInfo,
    imageColors,
    handleChangeFilter,
    selectedFilter,
    filtredAlbumsAndSingles,
    loading,
    playlists,
    user,
  };
};
