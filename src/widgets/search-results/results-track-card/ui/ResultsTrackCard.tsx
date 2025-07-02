import { Track } from "@shared/types/types";
import { SupabasePlaylist } from "@shared/types/playlist";
import { Playlist } from "@shared/types/types";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import { TrackCard } from "@shared/ui/track-card/TrackCard";
import SmallPlayIcon from "@shared/assets/small-play-icon.svg?react";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import { useTrackCard } from "@features/track-card/model/useTrackCard";
import { TrackContextMenu } from "@shared/ui/track-context-menu/TrackContextMenu";
import { AddToPlaylistModal } from "@shared/ui/add-to-playlist-modal/AddToPlaylistModal";

export const ResultsTrackCard = ({
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
      <div className="relative flex items-center group hover:bg-[#333336] pr-4 rounded-md">
        <button
          type="button"
          onClick={() => handleListenTrack(track)}
          className="absolute left-5 flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-black/50 rounded-md hidden group-hover:block" />
          <CustomTooltip
            title={`Включить трек «${track.name}» исполнителя ${track.artists
              .map((artist) => artist.name)
              .join(", ")}`}
            placement="top"
          >
            <SmallPlayIcon className="w-5 h-5 hidden group-hover:block absolute left-1/2 -translate-x-1/2 z-10" />
          </CustomTooltip>
        </button>
        <TrackCard
          track={track}
          index={index}
          withImage={true}
          withArtists={true}
          format="search"
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
