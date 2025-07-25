import { TablesTrack, Track } from "@shared/types/types";
import PlusIcon from "@shared/assets/plus-icon.svg?react";
import SearchIcon from "@shared/assets/search-icon.svg?react";
import { highlightMatch } from "@shared/ui/highlight-match/HighlightMatchText";
import { useUserStore } from "@app/store/user/useUser";
import React from "react";
import { useAddToPlaylistMenu } from "../model/useAddToPlaylistMenu";

type AddToPlaylistMenuTypes = {
  ref: React.RefObject<HTMLDivElement | null>;
  handleMouseEnter: React.MouseEventHandler<Element>;
  handleMouseLeave: () => void;
  handleAddTrackToPlaylist: (id: string, track: Track | TablesTrack) => void;
  track: Track | TablesTrack;
  closeMenu?: () => void;
};

export const AddToPlaylistMenu = ({
  ref,
  handleMouseEnter,
  handleMouseLeave,
  handleAddTrackToPlaylist,
  track,
  closeMenu,
}: AddToPlaylistMenuTypes) => {
  const { user } = useUserStore();
  const { search, setSearch, filteredPlaylists, handleCreatePlaylist } =
    useAddToPlaylistMenu({
      track,
      handleAddTrackToPlaylist,
    });
  return (
    <div
      ref={ref}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={handleMouseLeave}
      className="w-[260px] flex flex-col mt-2 bg-zinc-800 rounded-xs shadow-lg p-1"
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
          .filter((p) => p.user_id === user?.user.id)
          .map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => {
                handleAddTrackToPlaylist(playlist.id, track);
                if (closeMenu) {
                  closeMenu();
                }
              }}
              className="w-full flex items-center rounded-xs px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
            >
              {highlightMatch(playlist.name, search)}
            </button>
          ))}
      </div>
    </div>
  );
};
