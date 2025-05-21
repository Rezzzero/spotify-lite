import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Album } from "../../../shared/types/types";
export const useDiscography = () => {
  const [discography, setDiscography] = useState<Album[]>([]);
  const { id, filter } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/discography/${id}`
        );
        const data: Album[] = response.data.discography;
        if (filter === "all") {
          setDiscography(data);
        } else {
          setDiscography(
            data.filter((album: Album) => album.album_type === filter)
          );
        }
      } catch (error) {
        console.error("Error fetching discography:", error);
      }
    };

    fetch();
  }, [id, filter]);

  return { discography };
};
