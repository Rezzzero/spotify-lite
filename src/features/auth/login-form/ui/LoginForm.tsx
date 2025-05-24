import { Link } from "react-router-dom";
import spotifyLogo from "/spotify-logo.svg";
import googleLogo from "/google-auth-logo.svg";
import facebookLogo from "/facebook-auth-logo.svg";
import appleLogo from "/apple-auth-logo.svg";
import { Route } from "../../../../shared/constants/constants";
import { useLogin } from "../model/useLogin";

export const LoginForm = () => {
  const { email, handleChange } = useLogin();

  return (
    <div className="flex flex-col items-center bg-[#121212] rounded-md gap-5 pt-10 pb-15 px-26">
      <img src={spotifyLogo} alt="spotify logo" className="w-10 h-10" />
      <h1 className="text-3xl font-bold mb-4">Войти в Spotify Lite</h1>
      <div className="flex flex-col font-bold gap-2 px-25 border-b border-zinc-800 pb-8">
        <button className="flex items-center border border-zinc-500 hover:border-white cursor-pointer rounded-full py-3 px-7">
          <img src={googleLogo} alt="google logo" className="w-5 h-5" />
          <p className="mx-auto px-8">Войти через Google</p>
        </button>
        <button className="flex items-center border border-zinc-500 hover:border-white cursor-pointer rounded-full py-3 px-7">
          <img src={facebookLogo} alt="facebook logo" className="w-6 h-6" />
          <p className="mx-auto px-8">Войти через Facebook</p>
        </button>
        <button className="flex items-center border border-zinc-500 hover:border-white cursor-pointer rounded-full py-3 px-7">
          <img src={appleLogo} alt="apple logo" className="w-5 h-5" />
          <p className="mx-auto px-8">Войти через Apple</p>
        </button>
      </div>
      <form action="" className="flex flex-col w-full gap-2 mb-5 px-25">
        <label htmlFor="email" className="text-sm font-bold w-full">
          Электронная почта или имя пользователя
        </label>
        <input
          type="text"
          value={email}
          onChange={handleChange}
          placeholder="Электронная почта или имя пользователя"
          className="rounded-sm w-full py-2 px-4 outline-none border border-zinc-500 hover:border-white focus:border-white focus:shadow-[0_0_0_1px_white] mb-5"
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
