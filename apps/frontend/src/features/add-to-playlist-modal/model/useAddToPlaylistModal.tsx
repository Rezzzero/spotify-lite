import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { useUserStore } from "@app/store/user/useUser";
import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";
import { generateId } from "@shared/lib/id/generateId";
import { SupabasePlaylist } from "@shared/types/playlist";
import { Playlist, Track } from "@shared/types/types";
import { useState, useMemo } from "react";

export function useAddToPlaylistModal({
  playlists,
  userId,
  track,
  handleAddTrackToPlaylist,
}: {
  playlists: Playlist[] | SupabasePlaylist[];
  userId: string | undefined;
  track: Track;
  handleAddTrackToPlaylist: (id: string, track: Track) => void;
}) {
  const { user } = useUserStore();
  const { addPlaylist } = useMediaLibraryStore();
  const [search, setSearch] = useState("");
  const filteredPlaylists = useMemo(
    () =>
      playlists?.filter((p) => {
        if (p.user_id !== userId) return false;
        const searchLower = search.trim().toLowerCase();
        if (!searchLower) return true;
        const words = p.name.toLowerCase().split(/\s+/);
        return words.some((word) => word.startsWith(searchLower));
      }),
    [playlists, search, userId]
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
