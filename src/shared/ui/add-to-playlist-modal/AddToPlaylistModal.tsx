import { SupabasePlaylist } from "@shared/types/playlist";
import { Playlist, Track } from "@shared/types/types";

type AddToPlaylistModalTypes = {
  ref: React.RefObject<HTMLDivElement | null>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  isOwner: boolean;
  playlists: Playlist[] | SupabasePlaylist[];
  handleAddTrackToPlaylist: (id: string, track: Track) => void;
  track: Track;
  userId: string | undefined;
};

export const AddToPlaylistModal = ({
  ref,
  handleMouseEnter,
  handleMouseLeave,
  isOwner,
  playlists,
  handleAddTrackToPlaylist,
  track,
  userId,
}: AddToPlaylistModalTypes) => {
  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`absolute right-[342px] ${
        isOwner ? "-top-[155px]" : "-top-[120px]"
      } w-[260px] flex flex-col mt-2 bg-zinc-800 rounded-md shadow-lg z-50 p-1`}
    >
      {playlists
        .filter((p) => p.user_id === userId)
        .map((playlist) => (
          <button
            key={playlist.id}
            onClick={() => handleAddTrackToPlaylist(playlist.id, track)}
            className="w-full flex gap-2 items-center rounded-md px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
          >
            {playlist.name}
          </button>
        ))}
    </div>
  );
};
