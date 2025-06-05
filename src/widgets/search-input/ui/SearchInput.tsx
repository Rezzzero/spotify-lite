import { useSearchInput } from "../model/useSearchInput";
import SearchIcon from "../assets/search-icon.svg?react";
import BrowseIcon from "../assets/browse-icon.svg?react";
import BrowseSelectedIcon from "../assets/browse-selected-icon.svg";
import CrossIcon from "../assets/cross-icon.svg?react";
import { Link, useLocation } from "react-router-dom";
import { Route } from "@shared/constants/constants";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";

export const SearchInput = () => {
  const { value, setValue, handleChange } = useSearchInput();
  const location = useLocation();
  return (
    <div className="flex items-center gap-3 pl-2 pr-3 py-2 bg-[#262729] hover:bg-[#323233] rounded-full border border-transparent hover:border-gray-600 transition-all group duration-300 relative focus-within:!border-white">
      <CustomTooltip title="Поиск">
        <SearchIcon className="w-8 h-8 cursor-pointer text-[#bababa] group-hover:text-white group-focus-within:text-white" />
      </CustomTooltip>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Что хочешь включить?"
        className="bg-transparent w-full outline-none placeholder:text-[#bababa] pr-10 border-r border-[#bababa]"
      />
      {value.length > 0 && (
        <CustomTooltip title="Очистить строку поиска">
          <CrossIcon
            onClick={() => setValue("")}
            className="absolute right-14 w-4 h-4 text-[#bababa] hover:text-white cursor-pointer"
          />
        </CustomTooltip>
      )}
      <CustomTooltip title="Обзор">
        <Link to={Route.SEARCH_EMPTY} className="flex items-center w-7 h-5">
          {location.pathname === Route.SEARCH ||
          location.pathname === Route.SEARCH_EMPTY ? (
            <img
              src={BrowseSelectedIcon}
              alt="browse icon"
              className="w-full h-full cursor-pointer hover:scale-105"
            />
          ) : (
            <BrowseIcon className="w-full h-full cursor-pointer text-[#bababa] hover:text-white hover:scale-105" />
          )}
        </Link>
      </CustomTooltip>
    </div>
  );
};
