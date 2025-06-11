import { Playlist } from "@shared/types/types";
import axios from "axios";
import { useParams } from "react-router-dom";

export const usePlaylistMenuModal = ({
  isPublic,
  closeModal,
  setPlaylist,
}: {
  isPublic: boolean | undefined;
  closeModal: () => void;
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>;
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
      setPlaylist(response.data[0]);
    } catch (error) {
      console.error("Error changing public status:", error);
    }
  };

  return { changePublicStatus };
};
