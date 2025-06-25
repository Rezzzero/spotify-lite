import { Link } from "react-router-dom";
import { Playlist, Track } from "@shared/types/types";
import { formatMsToMinutesAndSeconds } from "@shared/lib/format/msToMinutesAndSeconds";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import SmallPlayIcon from "@shared/assets/small-play-icon.svg?react";
import { usePlaylistTrackCard } from "../model/usePlaylistTrackCard";
import DeleteTrackIcon from "@shared/assets/trash-fill-icon.svg?react";
import ToArtistIcon from "@shared/assets/artist-to-icon.svg?react";
import ToAlbumIcon from "@shared/assets/album-to-icon.svg?react";
import PlusIcon from "@shared/assets/plus-icon.svg?react";
import { SupabasePlaylist } from "@shared/types/playlist";

export const PlaylistTrackCard = ({
  track,
  index,
  libraryFormat,
  setTracks,
  handleUpdateDuration,
  isOwner,
  playlists,
  userId,
}: {
  track: Track;
  index: number;
  libraryFormat: string;
  setTracks: (tracks: Track[] | ((prevTracks: Track[]) => Track[])) => void;
  handleUpdateDuration: (trackDuration: number, isAdd: boolean) => void;
  isOwner: boolean;
  playlists: Playlist[] | SupabasePlaylist[];
  userId: string | undefined;
}) => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    buttonRef,
    handleDeleteTrack,
    formatAddedAt,
    isAddToMediaLibraryModalOpen,
    handleMouseEnter,
    handleMouseLeave,
    addToMediaLibraryRef,
    handleAddTrackToPlaylist,
  } = usePlaylistTrackCard({ setTracks, handleUpdateDuration });

  return (
    <div
      className={`px-5 grid ${
        libraryFormat === "compact"
          ? "grid-cols-[30px_2fr_1fr_1fr_1fr_auto]"
          : "grid-cols-[30px_2fr_1fr_1fr_auto]"
      } items-center py-[6px] pr-10 rounded-md group hover:bg-[#333336] relative`}
    >
      <div className="flex items-center gap-2">
        <p className="text-gray-400 text-lg group-hover:hidden font-semibold">
          {index + 1}
        </p>
        <CustomTooltip
          title={`Включить трек «${track.name}» исполнителя ${track.artists
            .map((artist) => artist.name)
            .join(", ")}`}
          placement="top"
        >
          <SmallPlayIcon className="w-3 h-3 hidden group-hover:block" />
        </CustomTooltip>
      </div>
      <div className="flex items-center gap-4">
        {libraryFormat !== "compact" && (
          <img
            src={track.album.images[0].url}
            alt={`${track.name} image`}
            className="w-10 h-10 rounded-md"
          />
        )}
        <div>
          <CustomTooltip title={track.name} placement="top">
            <Link to={`/track/${track.id}`} className="hover:underline">
              {track.name}
            </Link>
          </CustomTooltip>
          {libraryFormat !== "compact" && (
            <CustomTooltip
              title={track.artists.map((artist) => artist.name).join(", ")}
              placement="top"
            >
              <div className="flex text-gray-400 flex-wrap">
                {track.artists.map((artist, index) => (
                  <div key={artist.id} className="flex items-center">
                    <Link
                      to={`/artist/${artist.id}`}
                      className="text-sm font-semibold hover:underline"
                    >
                      {artist.name}
                    </Link>
                    {index < track.artists.length - 1 && <span>,&nbsp;</span>}
                  </div>
                ))}
              </div>
            </CustomTooltip>
          )}
        </div>
      </div>
      {libraryFormat === "compact" && (
        <div className="text-gray-400">
          {track.artists.map((artist) => artist.name).join(", ")}
        </div>
      )}
      <Link
        to={`/album/${track.album.id}`}
        className="text-sm text-gray-400 pl-[6px] group-hover:text-white hover:underline"
      >
        {track.album.name}
      </Link>
      {track.added_at && (
        <p className="text-gray-400 pl-1">{formatAddedAt(track.added_at)}</p>
      )}
      <p className="text-gray-400 ml-auto">
        {formatMsToMinutesAndSeconds(track.duration_ms)}
      </p>

      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="absolute right-1 hidden group-hover:block hover:scale-105 cursor-pointer"
      >
        <MenuIcon className="w-7 h-7 text-white text-gray-400" />
      </button>

      {isMenuOpen && (
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
                  handleDeleteTrack(track.duration_ms, track.entry_id || "");
                  setIsMenuOpen(false);
                }}
              >
                <DeleteTrackIcon className="w-4 h-4 mr-2" />
                Удалить из этого плейлиста
              </button>
            )}
            <Link
              className="w-full flex gap-2 items-center rounded-md px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
              to={`/artist/${track.artists[0].id}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ToArtistIcon className="w-4 h-4 mr-2" />К исполнителю
            </Link>
            <Link
              className="w-full flex gap-2 items-center rounded-md px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
              to={`/album/${track.album.id}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ToAlbumIcon className="w-4 h-4 mr-2" />К альбому
            </Link>
          </div>
        </div>
      )}
      {isAddToMediaLibraryModalOpen && (
        <div
          ref={addToMediaLibraryRef}
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
      )}
    </div>
  );
};
