import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { useUserStore } from "@app/store/user/useUser";
import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";
import { generateId } from "@shared/lib/id/generateId";
import { TablesTrack, Track } from "@shared/types/types";
import { useState, useMemo } from "react";

export function useAddToPlaylistMenu({
  track,
  handleAddTrackToPlaylist,
}: {
  track: Track | TablesTrack;
  handleAddTrackToPlaylist: (id: string, track: Track | TablesTrack) => void;
}) {
  const { user } = useUserStore();
  const { addPlaylist, playlists } = useMediaLibraryStore();
  const [search, setSearch] = useState("");
  const filteredPlaylists = useMemo(
    () =>
      playlists?.filter((p) => {
        if (p.user_id !== user?.user.id) return false;
        const searchLower = search.trim().toLowerCase();
        if (!searchLower) return true;
        const words = p.name.toLowerCase().split(/\s+/);
        return words.some((word) => word.startsWith(searchLower));
      }),
    [playlists, search, user?.user.id]
  );

  const handleCreatePlaylist = async () => {
    if (user) {
      const id = generateId();

      const playlistData = {
        id: id,
        user_id: user.user.id,
        name: track.name,
        description: "",
        public: true,
        images: [
          {
            url: track.album.images[0].url || PLAYLIST_PLACEHOLDER_URL,
          },
        ],
        owner: {
          display_name: user.user.user_metadata.userName,
        },
        show_in_profile: false,
      };

      try {
        await addPlaylist(playlistData);
        handleAddTrackToPlaylist(id, track);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { search, setSearch, filteredPlaylists, handleCreatePlaylist };
}
