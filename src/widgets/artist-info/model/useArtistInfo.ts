import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Album, Artist, Track } from "../../../shared/types/types";
import { useExtractColors } from "react-extract-colors";

export const useArtistInfo = () => {
  const [artistInfo, setArtistInfo] = useState<{
    artist: Artist;
    topTracks: Track[];
    albums: Album[];
  } | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageColors, setImageColors] = useState<string[] | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/artist/${id}`
        );
        const data: {
          artist: Artist;
          topTracks: Track[];
          albums: Album[];
        } = response.data;
        setArtistInfo(data);
        if (data?.artist?.images?.[1]?.url) {
          setImageUrl(data.artist.images[1].url);
        }
      } catch (error) {
        console.error("Error fetching artist info:", error);
      }
    };
    fetch();
  }, [id]);

  const { dominantColor, lighterColor } = useExtractColors(imageUrl || "", {
    format: "hex",
    maxSize: 200,
  });

  useEffect(() => {
    if (dominantColor && lighterColor) {
      setImageColors([lighterColor, dominantColor]);
    }
  }, [dominantColor, lighterColor]);

  return {
    artistInfo,
    imageColors,
  };
};
