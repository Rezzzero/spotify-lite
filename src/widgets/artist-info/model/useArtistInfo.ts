import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Album, Artist, Playlist, Track } from "../../../shared/types/types";
import { artistMusicFilterList } from "../../../shared/constants/constants";
import { useGetColors } from "../../../shared/lib/hooks/useGetColors";

interface artistInfoType {
  artist: Artist;
  topTracks: Track[];
  albumsAndSingles: Album[];
  otherArtists: Artist[];
  moreWithArtist: Album[];
  playlists: Playlist[];
}

export const useArtistInfo = () => {
  const [artistInfo, setArtistInfo] = useState<artistInfoType | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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
        const response = await axios.get(
          `http://localhost:3000/api/artist/${id}`
        );
        const data: artistInfoType = response.data;
        setArtistInfo(data);
        setFiltredAlbumsAndSingles(data.albumsAndSingles);
        if (data?.artist?.images?.[1]?.url) {
          setImageUrl(data.artist.images[1].url);
        }
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
  };
};
