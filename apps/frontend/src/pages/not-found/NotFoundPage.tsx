import { Route } from "@shared/constants/constants";
import { Link } from "react-router-dom";
import spotifyLogo from "@shared/assets/spotify-green-logo.svg";
import { handleChangeTitle } from "@shared/lib/utils/handleChangeTitle";

const NotFoundPage = () => {
  handleChangeTitle("Страница не найдена");
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen">
      <img src={spotifyLogo} alt="spotify logo" className="w-15 h-15 mb-5" />
      <h1 className="text-5xl font-bold">Страница не найдена</h1>
      <p className="text-gray-400 mb-5">Мы не нашли нужную страницу.</p>
      <Link
        to={Route.HOME}
        className="font-bold bg-white text-black rounded-full py-3 px-7 cursor-pointer hover:scale-105"
      >
        Главная
      </Link>
    </div>
  );
};

export default NotFoundPage;
