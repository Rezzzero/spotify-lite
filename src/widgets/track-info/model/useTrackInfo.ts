import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { Album, Artist, Track } from "@shared/types/types";
import { API_URL } from "@shared/constants/constants";

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
      } catch (error) {
        console.error("Error fetching track info:", error);
      }
    };
    fetch();
  }, [id]);

  return { trackData, albums, singles, imageColors };
};
