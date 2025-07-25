import { ShortenedAlbumType, TablesTrack, Track } from "@shared/types/types";
import { TrackContextMenu } from "@shared/ui/track-context-menu/TrackContextMenu";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import { useTrackCard } from "@features/track-card/model/useTrackCard";
import { Popper } from "@mui/material";
import { AddToPlaylistMenu } from "@features/add-to-playlist-menu/ui/AddToPlaylistMenu";

interface TrackMenuButtonProps {
  track: Track | TablesTrack;
  album?: ShortenedAlbumType;
  isOwner?: boolean;
  withoutAlbumLink?: boolean;
  withoutArtistLink?: boolean;
  setTracks?: (tracks: Track[] | ((prevTracks: Track[]) => Track[])) => void;
  handleUpdateDuration?: (trackDuration: number, isAdd: boolean) => void;
}

export const TrackMenuButton = ({
  track,
  album,
  isOwner,
  withoutAlbumLink,
  withoutArtistLink,
  setTracks,
  handleUpdateDuration,
}: TrackMenuButtonProps) => {
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
    anchorEl,
    subAnchorEl,
    handleOpenMenu,
  } = useTrackCard({ track, album, setTracks, handleUpdateDuration });
  return (
    <>
      <button
        ref={buttonRef}
        onClick={(e) => handleOpenMenu(e)}
        className={`absolute bottom-1/2 translate-y-1/2 translate-x-1/2 -right-5 ${
          isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        } hover:scale-105 cursor-pointer`}
      >
        <MenuIcon className="w-7 h-7 text-white text-gray-400" />
      </button>

      <Popper open={isMenuOpen} anchorEl={anchorEl} placement="bottom-end">
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
      </Popper>
      <Popper
        open={isAddToMediaLibraryModalOpen}
        anchorEl={subAnchorEl}
        placement="left-start"
      >
        <AddToPlaylistMenu
          ref={addToMediaLibraryRef}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          handleAddTrackToPlaylist={handleAddTrackToPlaylist}
          track={track}
        />
      </Popper>
    </>
  );
};
