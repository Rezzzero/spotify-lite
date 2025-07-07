import { Link } from "react-router-dom";
import { Logo } from "@shared/ui/logo/Logo";
import HomeIcon from "../assets/icons/home-icon.svg";
import HomeLeftIcon from "../assets/icons/home-left-icon.svg?react";
import { Route } from "@shared/constants/constants";
import { USER_PLACEHOLDER_URL } from "@shared/constants/urls";
import { SearchInput } from "../../search-input/ui/SearchInput";
import { useNavbar } from "../model/useNavBar";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";

export const NavBar = () => {
  const {
    user,
    location,
    handleSignOut,
    userImagePreview,
    isUserMenuOpen,
    userMenuRef,
    handleUserMenuOpen,
  } = useNavbar();
  return (
    <div
      className={`bg-black flex items-center ${
        user ? "justify-between" : ""
      } gap-5 p-2 pl-5`}
    >
      <Logo />
      <div className="flex items-center gap-5 ">
        {location.pathname === Route.HOME && (
          <CustomTooltip title="Главная">
            <Link
              to={Route.HOME}
              className="bg-[#262729] rounded-full p-3 hover:bg-[#3b3b3d] hover:scale-102 duration-200"
            >
              <img src={HomeIcon} alt="home icon" />
            </Link>
          </CustomTooltip>
        )}
        {location.pathname !== Route.HOME && (
          <CustomTooltip title="Главная">
            <Link
              to={Route.HOME}
              className="bg-[#262729] rounded-full p-3 hover:bg-[#3b3b3d] group hover:scale-102 duration-200"
            >
              <HomeLeftIcon className="text-[#BABABA] group-hover:text-white" />
            </Link>
          </CustomTooltip>
        )}
        <SearchInput />
      </div>
      {!user && (
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
      )}
      {user && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="cursor-pointer p-2 bg-zinc-800 rounded-full"
            onClick={handleUserMenuOpen}
          >
            <img
              src={
                userImagePreview ||
                user.user.user_metadata.userImage ||
                USER_PLACEHOLDER_URL
              }
              alt="user image"
              className="w-8 h-8 rounded-full"
            />
          </button>
        </div>
      )}
      {isUserMenuOpen && (
        <div
          className="absolute top-16 right-3 text-sm font-semibold bg-zinc-800 z-10 w-[190px] rounded-sm p-1 flex flex-col items-start"
          ref={userMenuRef}
        >
          <div className="flex w-full flex-col border-b border-zinc-700">
            <Link
              to={`/user/${user?.user.id}`}
              onClick={handleUserMenuOpen}
              className="text-white pl-2 py-2 w-full hover:underline hover:bg-zinc-700 rounded-xs cursor-default"
            >
              Профиль
            </Link>
            <Link
              to={`/user/${user?.user.id}`}
              onClick={handleUserMenuOpen}
              className="text-white pl-2 py-2 w-full hover:underline hover:bg-zinc-700 rounded-xs cursor-default"
            >
              Настройки
            </Link>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-white text-start pl-2 py-2 w-full hover:bg-zinc-700 rounded-xs cursor-default"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};
