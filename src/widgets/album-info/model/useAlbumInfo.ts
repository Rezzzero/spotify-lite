import { useState, useEffect } from "react";
import axios from "axios";
import { Album, Artist } from "@shared/types/types";
import { useParams } from "react-router-dom";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { API_URL } from "@shared/constants/constants";

interface AlbumDataType {
  album: Album;
  artist: Artist;
  otherAlbums: Album[];
}

export const useAlbumInfo = () => {
  const [albumData, setAlbumData] = useState<AlbumDataType | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { imageColors } = useGetColors(imageUrl);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/album/${id}`);
        const data: AlbumDataType = response.data;
        setAlbumData(data);
        if (data.album.images[1].url) {
          setImageUrl(data.album.images[1].url);
        }
      } catch (error) {
        console.error("Error fetching album info:", error);
      }
    };

    fetch();
  }, [id]);

  return { albumData, imageColors };
};
