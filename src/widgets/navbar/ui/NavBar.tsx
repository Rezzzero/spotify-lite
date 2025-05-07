import { Link } from "react-router-dom";
import { Logo } from "../../../shared/ui/logo/Logo";
import HomeIcon from "../assets/icons/home-icon.svg";
import { Route } from "../../../shared/constants/constants";
import { SearchInput } from "../../search-input/ui/SearchInput";

export const NavBar = () => {
  return (
    <div className="bg-black flex items-center gap-5 py-2 pl-5">
      <Logo />
      <Link
        to={Route.HOME}
        className="bg-[#262729] rounded-full p-3 hover:bg-[#3b3b3d] hover:scale-102"
      >
        <img src={HomeIcon} alt="home icon" />
      </Link>
      <SearchInput />
    </div>
  );
};
