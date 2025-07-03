import { Playlist, Track } from "@shared/types/types";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import { usePlaylistTrackCard } from "../model/usePlaylistTrackCard";
import { SupabasePlaylist } from "@shared/types/playlist";
import { TrackCard } from "@shared/ui/track-card/TrackCard";
import { TrackPlayButton } from "@shared/ui/track-play-button/TrackPlayButton";
import { TrackContextMenu } from "@shared/ui/track-context-menu/TrackContextMenu";
import { AddToPlaylistModal } from "@features/add-to-playlist-modal/ui/AddToPlaylistModal";
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
    isCurrent,
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    buttonRef,
    handleDeleteTrack,
    isAddToMediaLibraryModalOpen,
    handleMouseEnter,
    handleMouseLeave,
    addToMediaLibraryRef,
    handleAddTrackToPlaylist,
    handleListenTrack,
  } = usePlaylistTrackCard({ setTracks, handleUpdateDuration, track });

  return (
    <>
      <div className="relative flex items-center group hover:bg-[#333336] pr-4 pl-7">
        <TrackPlayButton
          track={track}
          index={index}
          handleListenTrack={handleListenTrack}
          isCurrent={isCurrent}
        />
        <TrackCard
          track={track}
          index={index}
          withAlbumName={true}
          withImage={true}
          withArtists={true}
          grid={true}
          format={libraryFormat}
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
            handleDeleteTrack={handleDeleteTrack}
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
