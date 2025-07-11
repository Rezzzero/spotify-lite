import { Track } from "@shared/types/types";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import { TrackCard } from "@shared/ui/track-card/TrackCard";
import { TrackPlayButton } from "@shared/ui/track-play-button/TrackPlayButton";
import { useTrackCard } from "@features/track-card/model/useTrackCard";
import { TrackContextMenu } from "@shared/ui/track-context-menu/TrackContextMenu";
import { AddToPlaylistModal } from "@features/add-to-playlist-modal/ui/AddToPlaylistModal";
export const TrackInfoTrackCard = ({
  track,
  index,
}: {
  track: Track;
  index: number;
}) => {
  const {
    isCurrent,
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    buttonRef,
    isAddToMediaLibraryModalOpen,
    addToMediaLibraryRef,
    handleMouseEnter,
    handleMouseLeave,
    handleAddTrackToPlaylist,
  } = useTrackCard({ track });

  return (
    <>
      <div className="relative flex items-center group hover:bg-[#333336] pr-4 pl-7">
        <TrackPlayButton track={track} index={index} />
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
            track={track}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
        {isAddToMediaLibraryModalOpen && (
          <AddToPlaylistModal
            ref={addToMediaLibraryRef}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleAddTrackToPlaylist={handleAddTrackToPlaylist}
            track={track}
          />
        )}
      </div>
    </>
  );
};
