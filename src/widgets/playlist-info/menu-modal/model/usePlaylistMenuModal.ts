import { PlaylistData } from "@widgets/playlist-info/types/types";
import { useParams } from "react-router-dom";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";

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
  const { changePublicStatus } = useMediaLibraryStore();
  const handleChangePublicStatus = async () => {
    try {
      const response = await changePublicStatus(id as string, !isPublic);

      closeModal();
      if (response) {
        setPlaylist({
          playlist: response,
          playlistName: response.name,
          playlistDescription: response.description,
          imageUrl: response.images[0].url,
        });
      }
    } catch (error) {
      console.error("Error changing public status:", error);
    }
  };

  return { handleChangePublicStatus };
};
