import PlusIcon from "../assets/plus-icon.svg?react";
import GlobalIcon from "@shared/assets/global-icon.svg";
import AddPlaylistIcon from "@shared/assets/add-playlist-icon.svg?react";
import AddDirectoryIcon from "../assets/directory-icon.svg?react";
import { MediaLibraryLinks, Route } from "@shared/constants/constants";
import { Link } from "react-router-dom";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import { useMediaLibrary } from "../model/useMediaLibrary";
import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";
import CloseMediaLibraryIcon from "@shared/assets/media-library/close-media-library.svg?react";
import OpenMediaLibraryIcon from "@shared/assets/media-library/open-media-library.svg?react";
import ClosedMediaLibraryIcon from "@shared/assets/media-library/closed-media-library.svg?react";

export const MediaLibrary = () => {
  const {
    user,
    createPlaylistModal,
    setCreatePlaylistModal,
    handleCreatePlaylist,
    LoginPromptModal,
    setLoginPromptModal,
    createPlaylistRef,
    loginPromptRef,
    createPlaylistButtonRef,
    playlists,
    id,
    isMediaLibraryOpen,
    setIsMediaLibraryOpen,
    playlistPreviewImages,
  } = useMediaLibrary();
  return (
    <div
      className={`flex flex-col gap-7 bg-[#141414] ${
        isMediaLibraryOpen ? "w-[25%] p-2" : "w-20 p-1"
      } h-[85vh] rounded-xl pb-8 relative`}
    >
      <div
        className={`flex ${
          isMediaLibraryOpen
            ? "flex-row justify-between px-2"
            : "flex-col gap-3 mt-1"
        } items-center pt-1 mb-2`}
      >
        <CustomTooltip
          title={`${
            isMediaLibraryOpen ? "Закрыть мою медиатеку" : "Открыть медиатеку"
          }`}
          placement="right"
        >
          <button
            type="button"
            onClick={() => setIsMediaLibraryOpen(!isMediaLibraryOpen)}
            className="flex items-center gap-2 font-bold group cursor-pointer relative"
          >
            {isMediaLibraryOpen ? (
              <>
                <CloseMediaLibraryIcon className="w-5 h-5 absolute top-1/2 -translate-y-1/2 -left-20 opacity-0 group-hover:opacity-100 group-hover:translate-x-[80px] transition-all duration-300 ease-in-out" />
                <p className="font-bold group-hover:translate-x-[26px] transition-all duration-300 ease-in-out">
                  Моя медиатека
                </p>
              </>
            ) : (
              <>
                <ClosedMediaLibraryIcon className="w-5 h-5 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-in-out" />
                <OpenMediaLibraryIcon className="w-5 h-5 absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
              </>
            )}
          </button>
        </CustomTooltip>
        <CustomTooltip title="Создать плейлист или папку" placement="top">
          <button
            type="button"
            ref={createPlaylistButtonRef}
            onClick={() => setCreatePlaylistModal((prev) => !prev)}
            className={`rounded-full flex items-center justify-center ${
              user
                ? `bg-zinc-800 hover:bg-zinc-700 py-[8px] ${
                    isMediaLibraryOpen ? "px-4" : "px-2"
                  }`
                : "p-2 hover:bg-zinc-800"
            } group duration-300 gap-3 cursor-pointer`}
          >
            <PlusIcon
              className={`text-[#bababa] group-hover:text-white w-4 h-4 ${
                createPlaylistModal && user && "rotate-45"
              } duration-400`}
            />
            {user && isMediaLibraryOpen && (
              <p className="font-bold text-sm">Создать</p>
            )}
          </button>
        </CustomTooltip>
      </div>
      {playlists.length === 0 ? (
        <>
          <div className="flex flex-col items-start font-bold gap-1 bg-[#212121] rounded-xl py-3 px-5">
            <h2>Создай свой первый плейлист</h2>
            <p className="text-sm font-normal mb-4">
              Это совсем не сложно! Мы поможем.
            </p>
            <button
              type="button"
              onClick={handleCreatePlaylist}
              className="bg-white rounded-full text-black text-sm py-2 px-4 hover:bg-gray-100 hover:scale-103 cursor-pointer"
            >
              Создать плейлист
            </button>
          </div>
          <div className="flex flex-col items-start font-bold gap-1 bg-[#212121] rounded-xl py-3 px-5 mb-auto">
            <h2>Подпишись на интересные подкасты</h2>
            <p className="text-sm font-normal mb-4">
              Ты будешь узнавать о новых выпусках.
            </p>
            <button
              type="button"
              className="bg-white rounded-full text-black text-sm py-2 px-4 hover:bg-gray-100 hover:scale-103 cursor-pointer"
            >
              Обзор
            </button>
          </div>
          <div className="flex flex-col items-start mt-auto gap-3 px-5">
            <ul className="flex flex-wrap text-[11px] text-[#b3b3b3] gap-3">
              {MediaLibraryLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
            <Link to={"/"} className="text-xs mb-5 hover:underline">
              Файлы cookie
            </Link>
            <button
              type="button"
              className="flex items-center gap-2 font-bold text-sm border border-gray-500 rounded-full py-1 px-3 hover:border-white hover:scale-105 cursor-pointer"
            >
              <img
                src={GlobalIcon}
                alt="select language icon"
                className="w-4 h-4"
              />
              <span>Русский</span>
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-1">
          {playlists.map((playlist) => (
            <CustomTooltip
              key={playlist.id}
              title={
                <>
                  <h1 className="font-bold">{playlist.name}</h1>
                  <span className="flex gap-1 font-normal text-sm text-gray-400">
                    Плейлист{" "}
                    <p className="font-bold mt-[3px] text-lg leading-none">·</p>
                    {playlist.owner.display_name}
                  </span>
                </>
              }
              placement="right"
              disableHoverListener={isMediaLibraryOpen}
            >
              <div>
                <Link
                  to={`/playlist/${playlist.id}`}
                  className={`${
                    id === playlist.id
                      ? "bg-zinc-800 hover:bg-zinc-700"
                      : "hover:bg-zinc-800"
                  } flex items-center ${
                    !isMediaLibraryOpen ? "justify-center" : "gap-3"
                  } rounded-md transition-colors p-2`}
                >
                  <img
                    src={
                      playlistPreviewImages.find((p) => p.id === playlist.id)
                        ?.previewImage ||
                      playlist.images[0]?.url ||
                      PLAYLIST_PLACEHOLDER_URL
                    }
                    alt={playlist.name}
                    className="w-12 h-12 rounded-md"
                  />
                  {isMediaLibraryOpen && (
                    <div>
                      <h1 className="font-bold">{playlist.name}</h1>
                      <span className="flex gap-1 font-semibold text-sm text-gray-400">
                        Плейлист{" "}
                        <p className="font-bold text-lg leading-none">·</p>
                        {playlist.owner.display_name}
                      </span>
                    </div>
                  )}
                </Link>
              </div>
            </CustomTooltip>
          ))}
        </div>
      )}
      {createPlaylistModal && (
        <div
          ref={createPlaylistRef}
          className={`absolute ${
            user ? "top-14 -right-36" : "top-12 right-4"
          } bg-[#292929] p-1 rounded-md shadow-[1px_23px_30px_-9px_rgba(0,_0,_0,_0.8)] z-20`}
        >
          {!user && (
            <button
              type="button"
              onClick={handleCreatePlaylist}
              className="flex items-center gap-3 bg-transparent hover:bg-zinc-700 w-full h-full px-3 py-2 rounded-xs"
            >
              <AddPlaylistIcon className="w-4 h-4 text-white" />
              Создать плейлист
            </button>
          )}
          {user && (
            <>
              <button
                type="button"
                onClick={handleCreatePlaylist}
                className="flex gap-2 hover:bg-zinc-700 group rounded-md py-2 pl-2 pr-7"
              >
                <div className="bg-zinc-600 rounded-full p-3">
                  <AddPlaylistIcon className="w-5 h-5 text-white group-hover:text-green-400 group-hover:rotate-7 group-hover:scale-105 duration-300" />
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-sm font-bold">Плейлист</p>
                  <p className="text-sm text-[#b3b3b3]">
                    Создай плейлист с треками.
                  </p>
                </div>
              </button>
              <div className=" h-0 border-b border-zinc-600 mx-3" />
              <button
                type="button"
                className="flex gap-2 hover:bg-zinc-700 group rounded-md py-2 pl-2 pr-7"
              >
                <div className="bg-zinc-600 rounded-full p-2">
                  <AddDirectoryIcon className="w-7 h-7 text-white group-hover:text-green-400 group-hover:rotate-7 group-hover:scale-105 duration-300" />
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-sm font-bold">Папка</p>
                  <p className="text-sm text-[#b3b3b3]">
                    Организуй свои плейлисты.
                  </p>
                </div>
              </button>
            </>
          )}
        </div>
      )}
      {LoginPromptModal && (
        <div
          ref={loginPromptRef}
          className="absolute top-18 right-[-338px] flex flex-col gap-2 bg-[#52c3fa] px-4 pt-3 pb-4 text-black rounded-md z-20"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-b-8 border-t-8 border-r-8 border-transparent border-r-[#52c3fa]" />

          <h1 className="font-bold">Создавай плейлисты</h1>
          <p className="text-sm max-w-[300px] font-semibold mb-2">
            Чтобы создавать плейлисты и делиться ими, войди в аккаунт.
          </p>
          <div className="flex items-center gap-3  ml-auto">
            <button
              type="button"
              onClick={() => setLoginPromptModal(false)}
              className="font-bold text-sm hover:scale-105 cursor-pointer"
            >
              Не сейчас
            </button>
            <Link
              to={Route.LOGIN}
              className="bg-white py-2 px-3 rounded-full font-bold text-sm hover:scale-105"
            >
              Войти
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
