import { PlaylistData } from "@widgets/playlist-info/types/types";
import axios from "axios";
import { useParams } from "react-router-dom";

export const usePlaylistMenuModal = ({
  isPublic,
  closeModal,
  setPlaylist,
}: {
  isPublic: boolean | undefined;
  closeModal: () => void;
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistData | null>>;
}) => {
  const { id } = useParams();
  const changePublicStatus = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/update-supabase-playlist/${id}`,
        {
          public: !isPublic,
        }
      );

      closeModal();
      setPlaylist({
        playlist: response.data[0],
        playlistName: response.data[0].name,
        playlistDescription: response.data[0].description,
        imageUrl: response.data[0].image_url,
      });
    } catch (error) {
      console.error("Error changing public status:", error);
    }
  };

  return { changePublicStatus };
};
