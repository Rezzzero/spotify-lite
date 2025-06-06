import { usePlaylistInfo } from "../model/usePlaylistInfo";
import PlaylistIcon from "@shared/assets/playlist-icon.svg?react";
import EditIcon from "@shared/assets/edit-icon.svg?react";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import ListIcon from "@shared/assets/drop-down/list-icon.svg?react";
import CrossIcon from "@shared/assets/cross-icon.svg?react";
import SearchIcon from "@shared/assets/search-icon.svg?react";
import { Link } from "react-router-dom";

export const PlaylistInfo = () => {
  const {
    playlist,
    imageColors,
    openPlaylist,
    playlistName,
    value,
    setValue,
    openSearch,
    setOpenSearch,
  } = usePlaylistInfo();
  const headerGradient = imageColors
    ? `linear-gradient(to bottom, ${imageColors[0]}, ${imageColors[1]})`
    : "linear-gradient(to bottom, #333, #222)";

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
          <h1 className="text-[90px] font-bold leading-none">{playlistName}</h1>
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
      <div className="flex flex-col gap-5 w-full pl-5 pr-8 h-[700px]">
        <div className="flex items-center pt-7 pb-10 justify-between w-full">
          <MenuIcon className="w-10 h-10 text-gray-400 hover:text-white cursor-pointer" />
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
      </div>
    </div>
  );
};
