import { Route } from "@shared/constants/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const useDeletePlaylistModal = (closeModal: () => void) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDeletePlaylist = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/delete-supabase-playlist/${id}`
      );

      closeModal();
      navigate(Route.HOME);
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return { handleDeletePlaylist };
};
