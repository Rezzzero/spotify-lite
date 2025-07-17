import { Link } from "react-router-dom";
import ToArtistIcon from "@shared/assets/artist-to-icon.svg?react";
import ToAlbumIcon from "@shared/assets/album-to-icon.svg?react";
import PlusIcon from "@shared/assets/plus-icon.svg?react";
import DeleteTrackIcon from "@shared/assets/trash-fill-icon.svg?react";
import {
  Album,
  ShortenedAlbumType,
  TablesTrack,
  Track,
} from "@shared/types/types";
import React from "react";

type TrackContextMenuProps = {
  menuRef: React.RefObject<HTMLDivElement | null>;
  handleMouseEnter: React.MouseEventHandler<Element>;
  handleMouseLeave: () => void;
  setIsMenuOpen: (open: boolean) => void;
  isOwner?: boolean;
  track: Track | TablesTrack;
  album?: Album | ShortenedAlbumType;
  withoutAlbumLink?: boolean;
  withoutArtistLink?: boolean;
  handleDeleteTrack?: (duration: number, id: string) => void;
};

const menuItemClass =
  "w-full flex gap-2 items-center rounded-md px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors";

export const TrackContextMenu = ({
  menuRef,
  handleMouseEnter,
  handleMouseLeave,
  setIsMenuOpen,
  isOwner,
  track,
  album,
  withoutAlbumLink,
  withoutArtistLink,
  handleDeleteTrack,
}: TrackContextMenuProps) => {
  return (
    <div
      ref={menuRef}
      className="mt-2 w-[330px] bg-zinc-800 rounded-md shadow-lg"
    >
      <div className="p-1">
        <button
          onMouseEnter={(e) => handleMouseEnter(e)}
          onMouseLeave={handleMouseLeave}
          className={menuItemClass}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Добавить в плейлист
        </button>
        {isOwner && (
          <button
            className={menuItemClass}
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
            className={menuItemClass}
            to={`/artist/${track.artists[0].id}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <ToArtistIcon className="w-4 h-4 mr-2" />К исполнителю
          </Link>
        )}
        {!withoutAlbumLink && (
          <Link
            className={menuItemClass}
            to={`/album/${album ? album.id : track.album.id}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <ToAlbumIcon className="w-4 h-4 mr-2" />К альбому
          </Link>
        )}
      </div>
    </div>
  );
};
