import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import DeleteIcon from "@shared/assets/playlist/delete-icon.svg?react";
import OpenPlaylistIcon from "@shared/assets/global-icon.svg?react";
import ClosePlaylistIcon from "@shared/assets/playlist/lock-icon.svg?react";
import AddToMediaLibraryIcon from "@shared/assets/playlist/add-to-media-library-icon.svg?react";
import PlaylistInMediaLibraryIcon from "@shared/assets/playlist/playlist-in-media-library-icon.svg?react";
import CopyIcon from "@shared/assets/copy-icon.svg?react";
import ShareIcon from "@shared/assets/playlist/share-icon.svg?react";
import ProfileIcon from "@shared/assets/user-icon.svg?react";
import { PlaylistData } from "@widgets/playlist-info/types/types";
import { SupabasePlaylist } from "@shared/types/playlist";
import { Playlist } from "@shared/types/types";
import { usePlaylistMenu } from "../model/usePlaylistMenu";

export const PlaylistMenu = ({
  playlist,
  modalRef,
  closeModal,
  openEditModal,
  openDeleteModal,
  isPublic,
  isOwner,
  setPlaylist,
}: {
  playlist: SupabasePlaylist | (Playlist & { duration: number }) | undefined;
  modalRef: React.RefObject<HTMLDivElement | null>;
  closeModal: () => void;
  openEditModal: () => void;
  openDeleteModal: () => void;
  isPublic: boolean | undefined;
  isOwner: boolean;
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistData | null>>;
}) => {
  const {
    handleChangePublicStatus,
    handleRemovePlaylistFromMediaLibrary,
    playlists,
    id,
    handleAddPlaylistToMediaLibrary,
    handleMouseEnter,
    handleMouseLeave,
    shareModalRef,
    shareModal,
    handleCopyLink,
    togglePlaylistInProfileStatus,
    isPlaylistInProfile,
  } = usePlaylistMenu({
    isPublic,
    playlist,
    closeModal,
    setPlaylist,
  });
  return (
    <div ref={modalRef} className=" w-[330px] rounded-sm bg-[#2d2d2e] p-1">
      {!isPublic ||
      !playlists.some(
        (playlist) => playlist.id === id
      ) ? null : isPlaylistInProfile ? (
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => togglePlaylistInProfileStatus()}
            className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
          >
            <ProfileIcon className="w-4 h-4" />
            Удалить из профиля
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => togglePlaylistInProfileStatus()}
            className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
          >
            <ProfileIcon className="w-4 h-4" />
            Добавить в профиль
          </button>
        </div>
      )}
      <div className="flex flex-col gap-1 border-y border-zinc-600">
        {isOwner && (
          <>
            <button
              type="button"
              onClick={() => {
                closeModal();
                openEditModal();
              }}
              className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
            >
              <EditIcon className="w-4 h-4" />
              Изменение сведений
            </button>
            <button
              type="button"
              onClick={() => openDeleteModal()}
              className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
            >
              <DeleteIcon className="w-4 h-4" />
              Удалить
            </button>
          </>
        )}
        {isOwner ? null : playlists.some((playlist) => playlist.id === id) ? (
          <button
            type="button"
            onClick={() => handleRemovePlaylistFromMediaLibrary()}
            className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
          >
            <PlaylistInMediaLibraryIcon className="w-4 h-4" />
            Удалить из медиатеки
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleAddPlaylistToMediaLibrary()}
            className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
          >
            <AddToMediaLibraryIcon className="w-4 h-4" />
            Добавить в медиатеку
          </button>
        )}
      </div>
      {isOwner && (
        <div className="flex flex-col gap-1 border-b border-zinc-600">
          <button
            type="button"
            onClick={() => handleChangePublicStatus()}
            className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
          >
            {isPublic ? (
              <ClosePlaylistIcon className="w-4 h-4" />
            ) : (
              <OpenPlaylistIcon className="w-4 h-4" />
            )}
            {isPublic ? "Закрыть доступ" : "Сделать открытым"}
          </button>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
        >
          <ShareIcon className="w-4 h-4" />
          Поделиться
        </button>
      </div>
      {shareModal && (
        <div
          ref={shareModalRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute bottom-0 -right-[255px] bg-[#2d2d2e] rounded-xs p-1 cursor-default"
        >
          <button
            onClick={() => handleCopyLink()}
            className="flex gap-2 items-center px-3 py-2 hover:bg-zinc-600 rounded-xs"
          >
            <CopyIcon className="w-4 h-4" />
            <p className="text-sm">Копировать ссылку на плейлист</p>
          </button>
        </div>
      )}
    </div>
  );
};
