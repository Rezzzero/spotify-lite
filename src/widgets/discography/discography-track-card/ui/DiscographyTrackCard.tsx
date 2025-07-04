import { Album, Playlist, Track } from "@shared/types/types";
import { SupabasePlaylist } from "@shared/types/playlist";
import { TrackCard } from "@shared/ui/track-card/TrackCard";
import { Link } from "react-router-dom";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import PlusIcon from "@shared/assets/plus-icon.svg?react";
import DeleteTrackIcon from "@shared/assets/trash-fill-icon.svg?react";
import ToAlbumIcon from "@shared/assets/album-to-icon.svg?react";
import { memo } from "react";
import { useTrackCard } from "@features/track-card/model/useTrackCard";
import { AddToPlaylistModal } from "@features/add-to-playlist-modal/ui/AddToPlaylistModal";
import { TrackPlayButton } from "@shared/ui/track-play-button/TrackPlayButton";
export const DiscographyTrackCard = memo(
  ({
    track,
    index,
    isOwner,
    playlists,
    userId,
    album,
  }: {
    track: Track;
    index: number;
    isOwner: boolean;
    playlists: Playlist[] | SupabasePlaylist[];
    userId: string | undefined;
    album: Album;
  }) => {
    const {
      isCurrent,
      isMenuOpen,
      setIsMenuOpen,
      isPlaying,
      pause,
      menuRef,
      buttonRef,
      isAddToMediaLibraryModalOpen,
      addToMediaLibraryRef,
      handleMouseEnter,
      handleMouseLeave,
      handleAddTrackToPlaylist,
      handleListenTrack,
    } = useTrackCard({ album, track });

    return (
      <>
        <div className="relative flex items-center group hover:bg-[#333336] pr-4 pl-7 rounded-md">
          <TrackPlayButton
            track={track}
            index={index}
            handleListenTrack={handleListenTrack}
            isCurrent={isCurrent}
            isPlaying={isPlaying}
            pause={pause}
          />
          <TrackCard
            track={track}
            index={index}
            withArtists={true}
            grid={true}
            format="discography"
            isCurrent={isCurrent}
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
                {isOwner && (
                  <button
                    className="w-full flex gap-2 items-center rounded-md px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    <DeleteTrackIcon className="w-4 h-4 mr-2" />
                    Удалить из этого плейлиста
                  </button>
                )}
                <Link
                  className="w-full flex gap-2 items-center rounded-md px-4 py-2 text-left text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
                  to={`/album/${album.id}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ToAlbumIcon className="w-4 h-4 mr-2" />К альбому
                </Link>
              </div>
            </div>
          )}
          {isAddToMediaLibraryModalOpen && (
            <AddToPlaylistModal
              ref={addToMediaLibraryRef}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              isOwner={isOwner}
              playlists={playlists}
              handleAddTrackToPlaylist={handleAddTrackToPlaylist}
              track={track}
              userId={userId}
            />
          )}
        </div>
      </>
    );
  }
);
