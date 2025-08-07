import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { Route } from "@shared/constants/constants";
import { useNavigate, useParams } from "react-router-dom";

export const useConfirmDeleteModal = ({
  isOwner,
  propId,
}: {
  isOwner: boolean;
  propId: string | undefined;
}) => {
  const {
    removePlaylist,
    removePlaylistFromUser,
    removeAlbum,
    unsubscribeArtist,
  } = useMediaLibraryStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const handleRemovePlaylist = () => {
    if (!propId) return;
    if (isOwner) {
      removePlaylist(propId);
    } else {
      removePlaylistFromUser(propId);
    }
    if (id === propId) {
      navigate(Route.HOME);
    }
  };

  const handleRemoveAlbum = () => {
    if (!propId) return;
    removeAlbum(propId);
    if (id === propId) {
      navigate(Route.HOME);
    }
  };

  const handleRemoveArtist = () => {
    if (!propId) return;
    unsubscribeArtist(propId);
  };

  return { handleRemovePlaylist, handleRemoveAlbum, handleRemoveArtist };
};
