import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import DeleteIcon from "@shared/assets/playlist/delete-icon.svg?react";
import OpenPlaylistIcon from "@shared/assets/global-icon.svg?react";
import ClosePlaylistIcon from "@shared/assets/playlist/lock-icon.svg?react";
import { usePlaylistMenuModal } from "../model/usePlaylistMenuModal";
import { PlaylistData } from "@widgets/playlist-info/types/types";

export const PlaylistMenuModal = ({
  modalRef,
  closeModal,
  openEditModal,
  openDeleteModal,
  isPublic,
  setPlaylist,
}: {
  modalRef: React.RefObject<HTMLDivElement | null>;
  closeModal: () => void;
  openEditModal: () => void;
  openDeleteModal: () => void;
  isPublic: boolean | undefined;
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistData | null>>;
}) => {
  const { changePublicStatus } = usePlaylistMenuModal({
    isPublic,
    closeModal,
    setPlaylist,
  });
  return (
    <div
      ref={modalRef}
      className="absolute top-20 left-7 w-[330px] rounded-sm bg-[#2d2d2e] p-1"
    >
      <div className="flex flex-col gap-1 border-y border-zinc-600">
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
      </div>
      <div className="flex flex-col gap-1 border-b border-zinc-600">
        <button
          type="button"
          onClick={() => changePublicStatus()}
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
    </div>
  );
};
