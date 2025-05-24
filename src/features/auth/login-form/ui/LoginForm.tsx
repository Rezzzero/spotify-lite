import { Link } from "react-router-dom";
import spotifyLogo from "/spotify-logo.svg";
import { Route } from "../../../../shared/constants/constants";

export const LoginForm = () => {
  return (
    <div className="flex flex-col items-center bg-[#121212] rounded-md gap-5 py-10 px-26">
      <img src={spotifyLogo} alt="spotify logo" className="w-10 h-10" />
      <h1 className="text-3xl font-bold">Войти в Spotify Lite</h1>
      <div className="flex flex-col font-bold gap-2 px-26 border-b border-zinc-800 pb-8">
        <button className="border border-zinc-500 hover:border-white cursor-pointer rounded-full py-2 px-10">
          Войти через Google
        </button>
        <button className="border border-zinc-500 hover:border-white cursor-pointer rounded-full py-2 px-10">
          Войти через Facebook
        </button>
        <button className="border border-zinc-500 hover:border-white cursor-pointer rounded-full py-2 px-10">
          Войти через Apple
        </button>
      </div>
      <form action="" className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-bold">
          Электронная почта или имя пользователя
        </label>
        <input
          type="text"
          placeholder="Электронная почта или имя пользователя"
          className="rounded-md py-2 px-4 outline-none border border-zinc-500 hover:border-white focus:rounded-sm focus:border-white focus:shadow-[0_0_0_1px_white] mb-5"
        />
        <button
          type="submit"
          className="text-black font-bold rounded-full bg-green-400 hover:bg-[#74eda0] hover:scale-105 py-3 px-10 cursor-pointer"
        >
          Продолжить
        </button>
      </form>
      <div className="flex font-semibold gap-2">
        <p className="text-zinc-400">Нет аккаунта?</p>
        <Link
          to={Route.REGISTRATION}
          className="text-white underline hover:text-green-400"
        >
          Регистрация в Spotify Lite
        </Link>
      </div>
    </div>
  );
};
