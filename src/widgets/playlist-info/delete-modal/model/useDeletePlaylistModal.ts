import { Route } from "@shared/constants/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaLibraryStore } from "src/app/store/media-library/useMediaLibraryStore";

export const useDeletePlaylistModal = (closeModal: () => void) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removePlaylist } = useMediaLibraryStore();
  const handleDeletePlaylist = async () => {
    try {
      removePlaylist(id as string);

      closeModal();
      navigate(Route.HOME);
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return { handleDeletePlaylist };
};
