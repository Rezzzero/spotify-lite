import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";

export const useMediaControls = () => {
  const { playlists, albums } = useMediaLibraryStore();
  return {
    playlists,
    albums,
  };
};
