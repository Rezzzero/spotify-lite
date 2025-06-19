import CrossIcon from "@shared/assets/cross-icon.svg?react";
import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import { useEditPlaylistModal } from "../model/useEditPlaylistModal";
import { PlaylistData } from "@widgets/playlist-info/types/types";
import { PLACEHOLDER_URL } from "@shared/constants/urls";

export const EditPlaylistModal = ({
  editModalRef,
  closeModal,
  playlistName,
  playlistDescription,
  playlistImage,
  setPlaylist,
}: {
  closeModal: () => void;
  editModalRef: React.RefObject<HTMLDivElement | null>;
  playlistName: string | undefined;
  playlistDescription: string | undefined;
  playlistImage: string | undefined;
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistData | null>>;
}) => {
  const {
    handleSelectImage,
    handleImageChange,
    fileInputRef,
    handleUpdatePlaylist,
    handleChangePlaylistName,
    handleChangePlaylistDescription,
    handleUploadPlaylistImage,
    previewImage,
    playlistPreviewImages,
    playlistId,
  } = useEditPlaylistModal({
    closeModal,
    playlistName,
    playlistDescription,
    setPlaylist,
  });
  return (
    <>
      <div className="bg-black/80 fixed inset-0 z-10" />
      <div
        ref={editModalRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 w-[475px] z-30 py-5 pl-5 pr-3 bg-[#2d2d2e] rounded-md"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Изменение сведений</h2>
          <button
            type="button"
            onClick={() => {
              closeModal();
            }}
            className="hover:bg-zinc-600 rounded-full p-2"
          >
            <CrossIcon className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-3 w-full pr-2">
          <div
            onClick={() => handleSelectImage()}
            className="flex items-center bg-zinc-800 rounded-sm h-[180px] w-[180px] shadow-xl group relative"
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <img
              src={
                playlistPreviewImages.find((p) => p.id === playlistId)
                  ?.previewImage ||
                previewImage ||
                playlistImage
              }
              alt="playlist image"
              className={`w-full h-full object-cover rounded-md ${
                playlistImage && playlistImage !== PLACEHOLDER_URL
                  ? "group-hover:opacity-20"
                  : "group-hover:opacity-0"
              }`}
            />
            <button
              type="button"
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <EditIcon className="w-11 h-11 mx-auto" />
              <p className="font-bold">Выбрать фото</p>
            </button>
            <button className="absolute top-3 right-3 hidden bg-black/70 group-hover:block hover:block rounded-full p-1">
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col gap-2 flex-1 text-sm">
            <input
              type="text"
              value={playlistName}
              onChange={handleChangePlaylistName}
              placeholder="Добавь название"
              className="bg-zinc-600 p-1 rounded-sm outline-none w-full border border-transparent focus:border-zinc-500 focus:bg-zinc-700"
            />
            <textarea
              value={playlistDescription}
              onChange={handleChangePlaylistDescription}
              placeholder="Добавь описание (необязательно)"
              className="bg-zinc-600 p-1 rounded-sm outline-none w-full resize-none h-full border border-transparent focus:border-zinc-500 focus:bg-zinc-700"
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-end pr-2">
          <button
            type="button"
            onClick={() => {
              handleUpdatePlaylist();
              handleUploadPlaylistImage();
            }}
            className="bg-white rounded-full text-black font-bold py-3 px-7 hover:bg-gray-100 hover:scale-105 cursor-pointer"
          >
            Сохранить
          </button>
        </div>
      </div>
    </>
  );
};
