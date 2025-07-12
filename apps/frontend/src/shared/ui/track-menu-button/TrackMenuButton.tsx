import { TablesTrack, Track } from "@shared/types/types";
import { TrackContextMenu } from "@shared/ui/track-context-menu/TrackContextMenu";
import { AddToPlaylistModal } from "@features/add-to-playlist-modal/ui/AddToPlaylistModal";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import { useTrackCard } from "@features/track-card/model/useTrackCard";

interface TrackMenuButtonProps {
  track: Track | TablesTrack;
  album?: {
    id: string;
    name: string;
    images: { url: string; width: number; height: number }[];
  };
  isOwner?: boolean;
  withoutAlbumLink?: boolean;
  withoutArtistLink?: boolean;
  setTracks?: (tracks: Track[] | ((prevTracks: Track[]) => Track[])) => void;
  handleUpdateDuration?: (trackDuration: number, isAdd: boolean) => void;
}

export const TrackMenuButton: React.FC<TrackMenuButtonProps> = ({
  track,
  album,
  isOwner,
  withoutAlbumLink,
  withoutArtistLink,
  setTracks,
  handleUpdateDuration,
}) => {
  const {
    menuRef,
    buttonRef,
    addToMediaLibraryRef,
    isMenuOpen,
    isAddToMediaLibraryModalOpen,
    handleMouseEnter,
    handleMouseLeave,
    handleAddTrackToPlaylist,
    handleDeleteTrack,
    setIsMenuOpen,
  } = useTrackCard({ track, album, setTracks, handleUpdateDuration });

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`absolute bottom-1/2 translate-y-1/2 translate-x-1/2 -right-5 hidden group-hover:block hover:scale-105 cursor-pointer`}
      >
        <MenuIcon className="w-7 h-7 text-white text-gray-400" />
      </button>

      {isMenuOpen && (
        <TrackContextMenu
          menuRef={menuRef}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          track={track}
          album={album}
          setIsMenuOpen={setIsMenuOpen}
          isOwner={isOwner}
          withoutAlbumLink={withoutAlbumLink}
          withoutArtistLink={withoutArtistLink}
          handleDeleteTrack={
            setTracks && handleUpdateDuration ? handleDeleteTrack : undefined
          }
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
    </>
  );
};
