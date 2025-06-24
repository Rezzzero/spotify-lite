import { Route } from "@shared/constants/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { toast } from "react-toastify";

export const useDeletePlaylistModal = (closeModal: () => void) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removePlaylist } = useMediaLibraryStore();
  const handleDeletePlaylist = async () => {
    try {
      removePlaylist(id as string);

      closeModal();
      navigate(Route.HOME);
      toast(<p className="font-semibold">Удалено из медиатеки</p>, {
        style: { width: "210px" },
      });
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return { handleDeletePlaylist };
};
