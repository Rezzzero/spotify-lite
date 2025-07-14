import { usePlaylistInfo } from "../model/usePlaylistInfo";
import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import { Link } from "react-router-dom";
import { SelectLibraryFormat } from "@shared/ui/select-library-format/SelectLibraryFormat";
import { DeletePlaylistModal } from "../delete-modal/ui/DeletePlaylistModal";
import { EditPlaylistModal } from "../edit-modal/ui/EditPlaylistModal";
import { PlaylistMenuModal } from "../menu-modal/ui/PlaylistMenuModal";
import { AddTrackSearch } from "../add-track-search/ui/AddTrackSearch";
import { formatMsToMinutesAndSeconds } from "@shared/lib/format/msToMinutesAndSeconds";
import {
  PLAYLIST_PLACEHOLDER_URL,
  USER_PLACEHOLDER_URL,
} from "@shared/constants/urls";
import { Loader } from "@shared/ui/loader/Loader";
import { MediaControls } from "@features/media-controls/ui/MediaControls";
import { Table } from "@shared/ui/table/Table";

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
    editModalRef,
    loading,
    changeFormatModal,
    setChangeFormatModal,
    changeFormatModalRef,
    playlistFormat,
    setPlaylistFormat,
    changeFormatButtonRef,
    deletePlaylistModal,
    setDeletePlaylistModal,
    tracks,
    setTracks,
    handleUpdateDuration,
    handleDeletePlaylistFromMediaLibrary,
    isOwner,
    handleListenPlaylist,
    isPlaying,
    handleAddPlaylistToMediaLibrary,
    deleteModalRef,
  } = usePlaylistInfo();
  const headerGradient = imageColors
    ? `linear-gradient(to bottom, ${imageColors[0]}, ${imageColors[1]})`
    : "linear-gradient(to bottom, #333, #222)";

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col">
      <div
        style={{ background: headerGradient }}
        className="flex items-center gap-7 p-7"
      >
        <div
          onClick={() => {
            if (isOwner) {
              setEditModal((prev) => !prev);
            }
          }}
          className="flex items-center bg-zinc-900 rounded-md w-[232px] h-[232px] shadow-xl group relative"
        >
          {isOwner ? (
            <>
              <img
                src={
                  playlistPreviewImages.find(
                    (p) => p.id === playlistData?.playlist.id
                  )?.previewImage ||
                  playlistData?.playlist.images[0]?.url ||
                  playlistData?.imageUrl ||
                  PLAYLIST_PLACEHOLDER_URL
                }
                alt="playlist image"
                className={`w-full h-full object-cover rounded-md ${
                  playlistPreviewImages.find(
                    (p) => p.id === playlistData?.playlist.id
                  )?.previewImage ||
                  playlistData?.playlist.images[0]?.url ||
                  playlistData?.imageUrl
                    ? "group-hover:opacity-20"
                    : "group-hover:opacity-0"
                } transition-opacity duration-200`}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <EditIcon className="w-13 h-13" />
                <p className="font-bold">Выбрать фото</p>
              </div>
            </>
          ) : (
            <img
              src={
                playlistData?.playlist.images[0]?.url ||
                playlistData?.imageUrl ||
                PLAYLIST_PLACEHOLDER_URL
              }
              alt="playlist image"
              className="w-full h-full object-cover rounded-md"
            />
          )}
        </div>
        <div className="flex flex-col gap-3 pt-12 h-full">
          <h2>
            {playlistData?.playlist?.public
              ? "Открытый плейлист"
              : "Закрытый плейлист"}
          </h2>
          <h1 className="text-[90px] font-bold leading-none">
            {playlistData?.playlist?.name}
          </h1>
          <div className="flex items-center gap-1 mt-auto">
            <img
              src={
                playlistData?.playlist?.owner?.imageUrl
                  ? playlistData.playlist.owner.imageUrl
                  : USER_PLACEHOLDER_URL
              }
              onError={(e) => {
                e.currentTarget.src = USER_PLACEHOLDER_URL;
              }}
              alt="playlist creator image"
              className="w-6 h-6 rounded-full"
            />
            <Link
              to={`/user/${playlistData?.playlist?.owner?.id}`}
              className="font-bold text-sm hover:underline"
            >
              {playlistData
                ? playlistData.playlist?.owner?.display_name
                : "owner"}
            </Link>
            {playlistData?.playlist?.duration && tracks.length > 0 ? (
              <p className="font-semibold opacity-70 text-sm pb-1">
                <span className="text-xl font-bold relative top-[1px] mx-1">
                  ·
                </span>
                {tracks.length} треков,{" "}
                {formatMsToMinutesAndSeconds(
                  playlistData?.playlist?.duration,
                  true
                )}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full pl-5 pr-8 relative">
        <MediaControls
          isOwner={isOwner}
          mediaData={playlistData?.playlist}
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
          onOpenMenu={() => setMenuModal((prev) => !prev)}
          onOpenFormatModal={() => setChangeFormatModal((prev) => !prev)}
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
        {menuModal && (
          <PlaylistMenuModal
            playlist={playlistData?.playlist}
            modalRef={menuModalRef}
            closeModal={() => setMenuModal(false)}
            openEditModal={() => setEditModal(true)}
            openDeleteModal={() => setDeletePlaylistModal(true)}
            isPublic={playlistData?.playlist.public}
            isOwner={isOwner}
            setPlaylist={setPlaylistData}
          />
        )}
        {changeFormatModal && (
          <div
            ref={changeFormatModalRef}
            className="absolute top-18 right-5 bg-zinc-800 p-1 rounded-md"
          >
            <SelectLibraryFormat
              libraryFormat={playlistFormat}
              setLibraryFormat={setPlaylistFormat}
              playlist
            />
          </div>
        )}
      </div>
      {editModal && (
        <EditPlaylistModal
          editModalRef={editModalRef}
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
      )}
      {deletePlaylistModal && (
        <DeletePlaylistModal
          playlistName={playlistData?.playlistName}
          closeModal={() => setDeletePlaylistModal(false)}
          ref={deleteModalRef}
        />
      )}
    </div>
  );
};
