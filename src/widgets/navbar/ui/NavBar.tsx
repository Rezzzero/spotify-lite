import { Link, useLocation } from "react-router-dom";
import { Logo } from "../../../shared/ui/logo/Logo";
import HomeIcon from "../assets/icons/home-icon.svg";
import HomeLeftIcon from "../assets/icons/home-left-icon.svg";
import HomeLeftHoverIcon from "../assets/icons/home-left-hover-icon.svg";
import { Route } from "../../../shared/constants/constants";
import { SearchInput } from "../../search-input/ui/SearchInput";
import { useState } from "react";

export const NavBar = () => {
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();
  return (
    <div className="bg-black flex items-center gap-5 p-2 pl-5">
      <Logo />
      {location.pathname === Route.HOME && (
        <Link
          to={Route.HOME}
          className="bg-[#262729] rounded-full p-3 hover:bg-[#3b3b3d] hover:scale-102 duration-200"
        >
          <img src={HomeIcon} alt="home icon" />
        </Link>
      )}
      {location.pathname !== Route.HOME && (
        <Link
          to={Route.HOME}
          className="bg-[#262729] rounded-full p-3 hover:bg-[#3b3b3d] hover:scale-102 duration-200"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src={isHovering ? HomeLeftHoverIcon : HomeLeftIcon}
            alt="home icon"
          />
        </Link>
      )}
      <SearchInput />
      <div className="flex items-center gap-3 ml-auto">
        <Link
          to={Route.REGISTRATION}
          className="text-zinc-400 text-sm font-bold hover:text-white hover:scale-105"
        >
          Зарегистрироваться
        </Link>
        <Link
          to={Route.LOGIN}
          className="bg-white rounded-full text-black font-bold py-3 px-7 hover:bg-gray-100 hover:scale-105 cursor-pointer"
        >
          Войти
        </Link>
      </div>
    </div>
  );
};
