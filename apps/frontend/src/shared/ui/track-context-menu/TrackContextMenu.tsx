import { Link } from "react-router-dom";
import ToArtistIcon from "@shared/assets/artist-to-icon.svg?react";
import ToAlbumIcon from "@shared/assets/album-to-icon.svg?react";
import PlusIcon from "@shared/assets/plus-icon.svg?react";
import DeleteTrackIcon from "@shared/assets/trash-fill-icon.svg?react";
import { Track } from "@shared/types/types";

type TrackContextMenuProps = {
  menuRef: React.RefObject<HTMLDivElement | null>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  setIsMenuOpen: (open: boolean) => void;
  isOwner?: boolean;
  track: Track;
  withoutAlbumLink?: boolean;
  withoutArtistLink?: boolean;
  handleDeleteTrack?: (duration: number, id: string) => void;
};

export const TrackContextMenu = ({
  menuRef,
  handleMouseEnter,
  handleMouseLeave,
  setIsMenuOpen,
  isOwner,
  track,
  withoutAlbumLink,
  withoutArtistLink,
  handleDeleteTrack,
}: TrackContextMenuProps) => {
  return (
    <div
      ref={menuRef}
      className="absolute right-3 bottom-14 mt-2 w-[330px] bg-zinc-800 rounded-md shadow-lg z-50"
    >
      <div className="p-1">
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full flex gap-2 items-center rounded-md px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Добавить в плейлист
        </button>
        {isOwner && (
          <button
            className="w-full flex gap-2 items-center rounded-md px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
            onClick={() => {
              if (handleDeleteTrack) {
                handleDeleteTrack(track.duration_ms, track.entry_id || "");
              }

              setIsMenuOpen(false);
            }}
          >
            <DeleteTrackIcon className="w-4 h-4 mr-2" />
            Удалить из этого плейлиста
          </button>
        )}
        {!withoutArtistLink && (
          <Link
            className="w-full flex gap-2 items-center rounded-md px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
            to={`/artist/${track.artists[0].id}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <ToArtistIcon className="w-4 h-4 mr-2" />К исполнителю
          </Link>
        )}
        {!withoutAlbumLink && (
          <Link
            className="w-full flex gap-2 items-center rounded-md px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
            to={`/album/${track.album.id}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <ToAlbumIcon className="w-4 h-4 mr-2" />К альбому
          </Link>
        )}
      </div>
    </div>
  );
};
