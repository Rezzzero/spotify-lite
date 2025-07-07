import { SupabasePlaylist } from "@shared/types/playlist";
import { Playlist, Track } from "@shared/types/types";
import PlusIcon from "@shared/assets/plus-icon.svg?react";
import SearchIcon from "@shared/assets/search-icon.svg?react";
import { useAddToPlaylistModal } from "../model/useAddToPlaylistModal";
import { highlightMatch } from "@shared/ui/highlight-match/HighlightMatchText";

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
  const { search, setSearch, filteredPlaylists, handleCreatePlaylist } =
    useAddToPlaylistModal({
      playlists,
      track,
      userId,
      handleAddTrackToPlaylist,
    });
  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`absolute right-[342px] ${
        isOwner ? "-top-[155px]" : "-top-[120px]"
      } w-[260px] flex flex-col mt-2 bg-zinc-800 rounded-xs shadow-lg z-50 p-1`}
    >
      <div className="flex px-2 py-1 gap-2 items-center rounded-xs bg-zinc-700">
        <SearchIcon className="w-4 h-4 cursor-pointer text-[#bababa] group-hover:text-white group-focus-within:text-white" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск плейлиста"
          className="outline-none"
        />
      </div>

      <button
        type="button"
        onClick={() => handleCreatePlaylist()}
        className="w-full flex gap-2 items-center rounded-xs border-b border-zinc-600 px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
      >
        <PlusIcon className="w-4 h-4" />
        Создать плейлист
      </button>
      <div className="flex flex-col">
        {filteredPlaylists
          .filter((p) => p.user_id === userId)
          .map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => handleAddTrackToPlaylist(playlist.id, track)}
              className="w-full flex items-center rounded-xs px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
            >
              {highlightMatch(playlist.name, search)}
            </button>
          ))}
      </div>
    </div>
  );
};
