import { Playlist, Track } from "@shared/types/types";
import { TrackCard } from "@shared/ui/track-card/TrackCard";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import { SupabasePlaylist } from "@shared/types/playlist";
import { TrackPlayButton } from "@shared/ui/track-play-button/TrackPlayButton";
import { useTrackCard } from "@features/track-card/model/useTrackCard";
import { TrackContextMenu } from "@shared/ui/track-context-menu/TrackContextMenu";
import { AddToPlaylistModal } from "@features/add-to-playlist-modal/ui/AddToPlaylistModal";
export const ArtistInfoTrackCard = ({
  track,
  index,
  isOwner,
  playlists,
  userId,
  format,
  withImage,
}: {
  track: Track;
  index: number;
  isOwner: boolean;
  playlists: Playlist[] | SupabasePlaylist[];
  userId: string | undefined;
  format: string;
  withImage: boolean;
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
      <div className="relative flex items-center group hover:bg-[#333336] pr-4 pl-10 rounded-md">
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
          addedAt={track.added_at}
          format={format}
          withImage={withImage}
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
            track={track}
            isOwner={false}
            setIsMenuOpen={setIsMenuOpen}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            withoutArtistLink={true}
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
