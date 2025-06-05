import PlusIcon from "../assets/plus-icon.svg?react";
import GlobalIcon from "../assets/global-icon.svg";
import { MediaLibraryLinks } from "@shared/constants/constants";
import { Link } from "react-router-dom";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";

export const MediaLibrary = () => {
  return (
    <div className="flex flex-col gap-7 bg-[#141414] w-[23%] h-[85vh] rounded-xl p-2 pb-8">
      <div className="flex items-center justify-between pt-1 px-2 mb-2">
        <h2 className="font-bold">Моя медиатека</h2>
        <CustomTooltip title="Создать плейлист или папку" placement="top">
          <button
            type="button"
            className="w-8 h-8 p-2 rounded-full flex items-center justify-center hover:bg-zinc-800 duration-300 cursor-pointer"
          >
            <PlusIcon className="text-[#bababa] w-4 h-4 hover:text-white" />
          </button>
        </CustomTooltip>
      </div>
      <div className="flex flex-col items-start font-bold gap-1 bg-[#1f1f1f] rounded-xl py-3 px-5">
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
      <div className="flex flex-col items-start font-bold gap-1 bg-[#1f1f1f] rounded-xl py-3 px-5 mb-auto">
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
    </div>
  );
};
