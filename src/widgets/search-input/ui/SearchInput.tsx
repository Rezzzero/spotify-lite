import { useSearchInput } from "../model/useSearchInput";
import SearchIcon from "../assets/search-icon.svg";
import SearchHoverIcon from "../assets/search-hover-icon.svg";
import BrowseIcon from "../assets/browse-icon.svg";
import BrowseHoverIcon from "../assets/browse-hover-icon.svg";
import BrowseSelectedIcon from "../assets/browse-selected-icon.svg";
import CrossIcon from "../assets/cross-icon.svg";
import { Link, useLocation } from "react-router-dom";
import { Route } from "../../../shared/constants/constants";

export const SearchInput = () => {
  const {
    value,
    setValue,
    handleChange,
    isInputFocused,
    setIsInputFocused,
    isHovering,
    setIsHovering,
    isBrowseHovering,
    setIsBrowseHovering,
  } = useSearchInput();
  const location = useLocation();
  return (
    <div
      className={`flex items-center gap-3 p-3 bg-[#262729] rounded-full border border-transparent ${
        isInputFocused ? "border-white" : "hover:border-gray-700"
      } transition-all duration-300 relative`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={isHovering ? SearchHoverIcon : SearchIcon}
        alt="search icon"
        className="w-6 h-6 cursor-pointer"
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        placeholder="Что хочешь включить?"
        className="bg-[#262729] w-full outline-none placeholder:text-[#bababa] pr-10 border-r border-[#bababa]"
      />
      {value.length > 0 && (
        <img
          src={CrossIcon}
          onClick={() => setValue("")}
          alt="cross icon"
          className="absolute right-14 w-4 h-4 cursor-pointer"
        />
      )}
      <Link to={Route.SEARCH_EMPTY} className="flex items-center w-7 h-5">
        {location.pathname === Route.SEARCH ||
        location.pathname === Route.SEARCH_EMPTY ? (
          <img
            src={BrowseSelectedIcon}
            alt="browse icon"
            className="w-full h-full cursor-pointer hover:scale-105"
          />
        ) : (
          <img
            src={isBrowseHovering ? BrowseHoverIcon : BrowseIcon}
            onMouseEnter={() => setIsBrowseHovering(true)}
            onMouseLeave={() => setIsBrowseHovering(false)}
            alt="browse icon"
            className="w-full h-full cursor-pointer hover:scale-105"
          />
        )}
      </Link>
    </div>
  );
};
