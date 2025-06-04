import { Route } from "@shared/constants/constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "src/app/store/user/useUser";

export const AuthPromoBanner = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  if (user) {
    return null;
  }

  return (
    <div
      onClick={() => navigate(Route.REGISTRATION)}
      className="flex bg-gradient-to-r from-[#ab1b83] to-blue-400 items-center justify-between py-2 px-5 mx-2 cursor-pointer"
    >
      <div>
        <h1 className="font-bold text-sm">
          Предварительный просмотр Spotify Lite
        </h1>
        <p>
          Зарегистрируйся, чтобы слушать музыку и подкасты без ограничений.
          Иногда мы будем показывать рекламу, но ты сможешь пользоваться
          сервисом бесплатно!
        </p>
      </div>
      <Link
        to={Route.REGISTRATION}
        className="bg-white rounded-full text-black font-bold py-3 px-7 hover:bg-gray-100 hover:scale-105 cursor-pointer"
      >
        Зарегистрироваться
      </Link>
    </div>
  );
};
