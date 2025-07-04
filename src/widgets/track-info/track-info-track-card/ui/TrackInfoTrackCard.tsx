import { Playlist, Track } from "@shared/types/types";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import { SupabasePlaylist } from "@shared/types/playlist";
import { TrackCard } from "@shared/ui/track-card/TrackCard";
import { TrackPlayButton } from "@shared/ui/track-play-button/TrackPlayButton";
import { useTrackCard } from "@features/track-card/model/useTrackCard";
import { TrackContextMenu } from "@shared/ui/track-context-menu/TrackContextMenu";
import { AddToPlaylistModal } from "@features/add-to-playlist-modal/ui/AddToPlaylistModal";
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
  } = useTrackCard({ track });

  return (
    <>
      <div className="relative flex items-center group hover:bg-[#333336] pr-4 pl-7">
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
          withImage={true}
          withArtists={true}
          withAlbumName={true}
          format="list"
          grid={true}
          addedAt={track.added_at}
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
          <TrackContextMenu
            menuRef={menuRef}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isOwner={isOwner}
            track={track}
            setIsMenuOpen={setIsMenuOpen}
          />
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
};
