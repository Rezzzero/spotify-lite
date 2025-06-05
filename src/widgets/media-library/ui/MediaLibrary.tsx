import PlusIcon from "../assets/plus-icon.svg?react";
import GlobalIcon from "../assets/global-icon.svg";
import addPlaylistIcon from "../assets/playlist-icon.svg";
import { MediaLibraryLinks, Route } from "@shared/constants/constants";
import { Link } from "react-router-dom";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import { useMediaLibrary } from "../model/useMediaLibrary";

export const MediaLibrary = () => {
  const {
    createPlaylistModal,
    setCreatePlaylistModal,
    handleCreatePlaylist,
    LoginPromptModal,
    setLoginPromptModal,
    createPlaylistRef,
    loginPromptRef,
  } = useMediaLibrary();
  return (
    <div className="flex flex-col gap-7 bg-[#141414] w-[23%] h-[85vh] rounded-xl p-2 pb-8 relative">
      <div className="flex items-center justify-between pt-1 px-2 mb-2">
        <h2 className="font-bold">Моя медиатека</h2>
        <CustomTooltip title="Создать плейлист или папку" placement="top">
          <button
            type="button"
            onClick={() => setCreatePlaylistModal(true)}
            className="w-8 h-8 p-2 rounded-full flex items-center justify-center hover:bg-zinc-800 duration-300 cursor-pointer"
          >
            <PlusIcon className="text-[#bababa] w-4 h-4 hover:text-white" />
          </button>
        </CustomTooltip>
      </div>
      <div className="flex flex-col items-start font-bold gap-1 bg-[#212121] rounded-xl py-3 px-5">
        <h2>Создай свой первый плейлист</h2>
        <p className="text-sm font-normal mb-4">
          Это совсем не сложно! Мы поможем.
        </p>
        <button
          type="button"
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
      <div className="flex flex-col items-start gap-3 px-5">
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
      {createPlaylistModal && (
        <div
          ref={createPlaylistRef}
          className="absolute top-12 right-4 bg-[#292929] p-1 rounded-md shadow-[1px_23px_30px_-9px_rgba(0,_0,_0,_0.8)]"
        >
          <button
            type="button"
            onClick={handleCreatePlaylist}
            className="flex items-center gap-3 bg-transparent hover:bg-zinc-700 w-full h-full px-3 py-2 rounded-xs"
          >
            <img
              src={addPlaylistIcon}
              alt="add playlist icon"
              className="w-4 h-4"
            />
            Создать плейлист
          </button>
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
