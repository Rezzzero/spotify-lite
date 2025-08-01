import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { useUserStore } from "@app/store/user/useUser";
import { useParams } from "react-router-dom";

export const useMediaControls = () => {
  const { playlists, albums } = useMediaLibraryStore();
  const { userToArtistsSubs } = useUserStore();
  const { id } = useParams();
  const isSubscribed = userToArtistsSubs.some((artist) => artist.id === id);

  return {
    playlists,
    albums,
    isSubscribed,
  };
};
