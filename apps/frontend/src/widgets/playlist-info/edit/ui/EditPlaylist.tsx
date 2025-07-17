import CrossIcon from "@shared/assets/cross-icon.svg?react";
import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import DeleteIcon from "@shared/assets/trash-fill-icon.svg?react";
import ChangeIcon from "@shared/assets/playlist/gallery-icon.svg?react";
import { PlaylistData } from "@widgets/playlist-info/types/types";
import { useEditPlaylist } from "../model/useEditPlaylist";

export const EditPlaylist = ({
  closeModal,
  playlistName,
  playlistDescription,
  playlistImage,
  setPlaylist,
}: {
  closeModal: () => void;
  playlistName: string | undefined;
  playlistDescription: string | undefined;
  playlistImage: string | undefined;
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistData | null>>;
}) => {
  const {
    handleSelectImage,
    handleImageChange,
    fileInputRef,
    handleSavePlaylist,
    handleChangePlaylistName,
    handleChangePlaylistDescription,
    previewImage,
    playlistPreviewImages,
    playlistId,
    subModal,
    setSubModal,
    subModalRef,
    subModalButtonRef,
    handleDeletePlaylistPreviewImage,
  } = useEditPlaylist({
    closeModal,
    playlistName,
    playlistDescription,
    setPlaylist,
  });
  return (
    <div className="flex flex-col gap-5 w-[475px] py-5 pl-5 pr-3 bg-[#2d2d2e] rounded-md">
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
          className="flex items-center rounded-sm hover:bg-zinc-800 h-[180px] w-[180px] group relative"
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
              previewImage ||
              playlistPreviewImages.find((p) => p.id === playlistId)
                ?.previewImage ||
              playlistImage
            }
            alt="playlist image"
            className="w-full h-full object-cover rounded-md shadow-xl group-hover:opacity-20 transition-opacity duration-200"
          />
          <button
            type="button"
            className="absolute inset-0 top-1/2 -translate-y-1/3 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <EditIcon className="w-11 h-11" />
            <p className="font-bold">Выбрать фото</p>
          </button>
          <button
            type="button"
            ref={subModalButtonRef}
            onClick={(event) => {
              event.stopPropagation();
              setSubModal((prev) => !prev);
            }}
            className={`absolute top-3 right-3 ${
              subModal ? "block" : "hidden"
            } bg-black/70 group-hover:block hover:block rounded-full p-1`}
          >
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
      <div className="flex items-center justify-end pr-2">
        <button
          type="button"
          onClick={handleSavePlaylist}
          className="bg-white rounded-full text-black font-bold py-3 px-7 hover:bg-gray-100 hover:scale-105 cursor-pointer"
        >
          Сохранить
        </button>
      </div>
      {subModal && (
        <div
          ref={subModalRef}
          className="absolute top-1/3 left-1/3 rounded-sm bg-[#2d2d2e] p-1 z-30"
        >
          <button
            type="button"
            onClick={() => {
              handleSelectImage();
            }}
            className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
          >
            <ChangeIcon className="w-4 h-4" />
            Cменить фото
          </button>
          <button
            type="button"
            onClick={() => {
              handleDeletePlaylistPreviewImage();
            }}
            className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
          >
            <DeleteIcon className="w-4 h-4" />
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};
