import { Link } from "react-router-dom";
import { Playlist, Track } from "@shared/types/types";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import SmallPlayIcon from "@shared/assets/small-play-icon.svg?react";
import ToArtistIcon from "@shared/assets/artist-to-icon.svg?react";
import ToAlbumIcon from "@shared/assets/album-to-icon.svg?react";
import PlusIcon from "@shared/assets/plus-icon.svg?react";
import { SupabasePlaylist } from "@shared/types/playlist";
import { TrackCard } from "@shared/ui/track-card/TrackCard";
import { useTrackInfoTrackCard } from "../model/useTrackInfoTrackCard";

export const TrackInfoTrackCard = ({
  track,
  index,
  isOwner,
  playlists,
  userId,
}: {
  track: Track;
  index: number;
  isOwner: boolean;
  playlists: Playlist[] | SupabasePlaylist[];
  userId: string | undefined;
}) => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    buttonRef,
    isAddToMediaLibraryModalOpen,
    handleMouseEnter,
    handleMouseLeave,
    addToMediaLibraryRef,
    handleAddTrackToPlaylist,
  } = useTrackInfoTrackCard();

  return (
    <>
      <div className="relative flex items-center group hover:bg-[#333336] pr-4 pl-7">
        <div className="absolute left-5 flex items-center gap-2">
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
        <TrackCard
          track={track}
          index={index}
          withImage={true}
          withArtists={true}
          withAlbumName={true}
          format="list"
          grid={true}
          addedAt={track.added_at}
        />
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
    </>
  );
};
