import { usePlaylistInfo } from "../model/usePlaylistInfo";
import { SelectLibraryFormat } from "@shared/ui/select-library-format/SelectLibraryFormat";
import { AddTrackSearch } from "../add-track-search/ui/AddTrackSearch";
import {
  PLAYLIST_PLACEHOLDER_URL,
  USER_PLACEHOLDER_URL,
} from "@shared/constants/urls";
import { Loader } from "@shared/ui/loader/Loader";
import { MediaControls } from "@features/media-controls/ui/MediaControls";
import { Table } from "@shared/ui/table/Table";
import { Box, Modal, Popper } from "@mui/material";
import { EditPlaylist } from "../edit/ui/EditPlaylist";
import { MediaHeader } from "@shared/ui/media-header/MediaHeader";
import { MediaMenu } from "@features/media-menu/ui/MediaMenu";
import { ConfirmDeleteModal } from "@features/confirm-delete-modal/ui/ConfirmDeleteModal";
import { handleChangeTitle } from "@shared/lib/utils/handleChangeTitle";

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: 0,
};

export const PlaylistInfo = () => {
  const {
    playlistPreviewImages,
    playlistData,
    setPlaylistData,
    imageColors,
    openSearch,
    setOpenSearch,
    menuModal,
    setMenuModal,
    menuModalRef,
    menuButtonRef,
    editModal,
    setEditModal,
    loading,
    changeFormatModal,
    changeFormatModalRef,
    playlistFormat,
    setPlaylistFormat,
    changeFormatButtonRef,
    tracks,
    setTracks,
    handleUpdateDuration,
    handleDeletePlaylistFromMediaLibrary,
    isOwner,
    handleListenPlaylist,
    isPlaying,
    handleAddPlaylistToMediaLibrary,
    handleOpenMenu,
    menuAnchor,
    changeFormatAnchor,
    handleOpenFormatChangeMenu,
    confirmDeleteModal,
    setConfirmDeleteModal,
  } = usePlaylistInfo();

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  handleChangeTitle(
    `${playlistData?.playlistName} - playlist by ${playlistData?.playlist.owner?.display_name} | Spotify Lite`
  );
  const mainImage =
    playlistPreviewImages.find((p) => p.id === playlistData?.playlist.id)
      ?.previewImage ||
    playlistData?.playlist.images[0]?.url ||
    playlistData?.imageUrl ||
    PLAYLIST_PLACEHOLDER_URL;
  const ownerImage = playlistData?.playlist?.owner?.imageUrl
    ? playlistData.playlist.owner.imageUrl
    : USER_PLACEHOLDER_URL;

  return (
    <div className="flex flex-col">
      <MediaHeader
        mainImage={mainImage}
        mainName={playlistData?.playlistName}
        ownerName={playlistData?.playlist.owner?.display_name}
        ownerImage={ownerImage}
        isOwner={isOwner}
        totalTracks={tracks.length}
        imageColors={imageColors}
        duration={playlistData?.playlist?.duration}
        openEditModal={setEditModal}
        isPublic={playlistData?.playlist?.public}
        link={`/user/${playlistData?.playlist?.owner?.id}`}
      />
      <div className="flex flex-col gap-5 w-full pl-5 pr-8 relative">
        <MediaControls
          isOwner={isOwner}
          mediaName={playlistData?.playlistName}
          mediaId={playlistData?.playlist.id}
          isPlaying={isPlaying}
          format={playlistFormat}
          tracks={tracks}
          menuButtonRef={menuButtonRef}
          changeFormatButtonRef={changeFormatButtonRef}
          onPlay={() => handleListenPlaylist()}
          onAddToLibrary={() =>
            handleAddPlaylistToMediaLibrary(playlistData?.playlist.id as string)
          }
          onRemoveFromLibrary={() =>
            handleDeletePlaylistFromMediaLibrary(
              playlistData?.playlist.id as string
            )
          }
          onOpenMenu={(e) => handleOpenMenu(e)}
          onOpenFormatModal={(e) => handleOpenFormatChangeMenu(e)}
          type="playlist"
        />
        {tracks.length > 0 && (
          <Table
            tracks={tracks}
            tableKey="default"
            setTracks={setTracks}
            handleUpdateDuration={handleUpdateDuration}
            isOwner={isOwner}
            withImage={true}
            withAddedAt={true}
            withAlbum={true}
          />
        )}
        {isOwner &&
          (openSearch ? (
            <AddTrackSearch
              closeSearch={() => setOpenSearch(false)}
              setTracks={setTracks}
              handleUpdateDuration={handleUpdateDuration}
            />
          ) : (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={() => setOpenSearch(true)}
                className="font-bold text-sm"
              >
                Еще
              </button>
            </div>
          ))}
        <Popper open={menuModal} anchorEl={menuAnchor} placement="bottom-start">
          <MediaMenu
            menuRef={menuModalRef}
            isOwner={isOwner}
            isPublic={playlistData?.playlist.public}
            closeMenu={() => setMenuModal(false)}
            openEditMenu={() => setEditModal(true)}
            setPlaylist={setPlaylistData}
            isInProfile={playlistData?.playlist.show_in_profile}
            mediaType="playlist"
            mediaName={playlistData?.playlistName}
            openedFromMediaLibary={false}
            onOpenDeleteModal={() => setConfirmDeleteModal(true)}
          />
        </Popper>
        <Popper
          open={changeFormatModal}
          anchorEl={changeFormatAnchor}
          placement="bottom-start"
        >
          <div
            ref={changeFormatModalRef}
            className="mt-2 bg-zinc-800 p-1 rounded-md"
          >
            <SelectLibraryFormat
              libraryFormat={playlistFormat}
              setLibraryFormat={setPlaylistFormat}
              playlist
            />
          </div>
        </Popper>
      </div>
      <Modal open={editModal} onClose={() => setEditModal(false)}>
        <Box sx={modalBoxStyle}>
          <EditPlaylist
            closeModal={() => setEditModal(false)}
            playlistName={playlistData?.playlistName}
            playlistDescription={playlistData?.playlistDescription}
            playlistImage={
              playlistData?.playlist.images[0]?.url ||
              playlistData?.imageUrl ||
              PLAYLIST_PLACEHOLDER_URL
            }
            setPlaylist={setPlaylistData}
          />
        </Box>
      </Modal>
      <ConfirmDeleteModal
        name={playlistData?.playlistName}
        type="playlist"
        isOpen={confirmDeleteModal}
        closeModal={() => setConfirmDeleteModal(false)}
        isOwner={isOwner}
        id={playlistData?.playlist.id}
      />
    </div>
  );
};
