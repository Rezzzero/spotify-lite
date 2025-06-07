import { usePlaylistInfo } from "../model/usePlaylistInfo";
import PlaylistIcon from "@shared/assets/playlist/playlist-icon.svg?react";
import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import DeleteIcon from "@shared/assets/playlist/delete-icon.svg?react";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import ListIcon from "@shared/assets/drop-down/list-icon.svg?react";
import CrossIcon from "@shared/assets/cross-icon.svg?react";
import SearchIcon from "@shared/assets/search-icon.svg?react";
import CompactListIcon from "@shared/assets/compact-list-icon.svg?react";
import OpenPlaylistIcon from "@shared/assets/global-icon.svg?react";
import ClosePlaylistIcon from "@shared/assets/playlist/lock-icon.svg?react";
import { Link } from "react-router-dom";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";

export const PlaylistInfo = () => {
  const {
    playlist,
    imageColors,
    openPlaylist,
    value,
    setValue,
    openSearch,
    setOpenSearch,
    menuModal,
    setMenuModal,
    menuModalRef,
    menuButtonRef,
    editModal,
    setEditModal,
    editModalRef,
    playlistNewName,
    playlistDescription,
    handleChangePlaylistName,
    handleChangePlaylistDescription,
    loading,
  } = usePlaylistInfo();
  const headerGradient = imageColors
    ? `linear-gradient(to bottom, ${imageColors[0]}, ${imageColors[1]})`
    : "linear-gradient(to bottom, #333, #222)";

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      <div
        style={{ background: headerGradient }}
        className="flex items-center gap-7 p-7"
      >
        <div className="flex items-center bg-zinc-800 rounded-md w-[232px] h-[232px] shadow-xl group">
          <PlaylistIcon className="text-gray-400 w-15 h-15 ml-20 group-hover:hidden" />
          <button
            type="button"
            className="flex flex-col items-center gap-2 ml-16 hidden group-hover:block"
          >
            <EditIcon className="w-13 h-13 ml-7" />
            <p className="font-bold">Выбрать фото</p>
          </button>
        </div>
        <div className="flex flex-col gap-3 pt-12 h-full">
          <h2>{openPlaylist ? "Открытый плейлист" : "Закрытый плейлист"}</h2>
          <h1 className="text-[90px] font-bold leading-none">
            {playlistNewName}
          </h1>
          <div className="flex gap-1 mt-auto">
            <img
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              alt="playlist creator image"
              className="w-6 h-6 rounded-full"
            />
            <Link to={"/"} className="hover:underline">
              {playlist ? playlist.owner.display_name : "owner"}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full pl-5 pr-8 h-[700px] relative">
        <div className="flex items-center pt-7 pb-10 justify-between w-full">
          <CustomTooltip
            title={`Открыть контекстное меню: ${playlistNewName}`}
            placement="top"
            customFontSize={13}
          >
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuModal((prev) => !prev)}
            >
              <MenuIcon className="w-10 h-10 text-gray-400 hover:text-white cursor-pointer hover:scale-105" />
            </button>
          </CustomTooltip>
          <button
            type="button"
            className="flex gap-2 text-sm font-semibold items-center text-gray-400 group hover:text-white cursor-pointer"
          >
            Список
            <ListIcon className="w-3 h-3 text-gray-400 group-hover:text-white" />
          </button>
        </div>
        {openSearch ? (
          <div className="flex items-center justify-between pr-2 pt-5 border-t border-zinc-700">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">
                Давай добавим что-нибудь в твой плейлист
              </h2>
              <div className="relative bg-zinc-700 mt-5 rounded-sm p-2 pl-8">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Поиск треков"
                  className="bg-transparent w-full outline-none placeholder:text-gray-300 pr-10"
                />
                <SearchIcon className="absolute top-1/2 transform -translate-y-1/2 left-2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <button type="button" onClick={() => setOpenSearch(false)}>
              <CrossIcon className="text-gray-400 w-5 h-5" />
            </button>
          </div>
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
        )}
        {menuModal && (
          <div
            ref={menuModalRef}
            className="absolute top-20 left-7 w-[330px] rounded-sm bg-[#2d2d2e] p-1"
          >
            <div className="flex flex-col gap-1 border-y border-zinc-600">
              <button
                type="button"
                onClick={() => {
                  setMenuModal(false);
                  setEditModal(true);
                }}
                className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
              >
                <EditIcon className="w-4 h-4" />
                Изменение сведений
              </button>
              <button
                type="button"
                className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
              >
                <DeleteIcon className="w-4 h-4" />
                Удалить
              </button>
            </div>
            <div className="flex flex-col gap-1 border-b border-zinc-600">
              <button
                type="button"
                className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
              >
                <ClosePlaylistIcon className="w-4 h-4" />
                Закрыть доступ
              </button>
            </div>
          </div>
        )}
      </div>
      {editModal && (
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
                  setEditModal(false);
                }}
                className="hover:bg-zinc-600 rounded-full p-2"
              >
                <CrossIcon className="w-3 h-3" />
              </button>
            </div>
            <div className="flex gap-3 w-full pr-2">
              <div className="flex items-center bg-zinc-800 rounded-sm h-[180px] w-[180px] shadow-xl group relative flex-shrink-0">
                <PlaylistIcon className="text-gray-400 w-13 h-13 mx-auto group-hover:hidden" />
                <button
                  type="button"
                  className="flex flex-col items-center gap-2 hidden mx-auto group-hover:block"
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
                  value={playlistNewName}
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
                className="bg-white rounded-full text-black font-bold py-3 px-7 hover:bg-gray-100 hover:scale-105 cursor-pointer"
              >
                Сохранить
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
