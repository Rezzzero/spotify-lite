import spotifyLogo from "/spotify-logo.svg";
import googleLogo from "/google-auth-logo.svg";
import facebookLogo from "/facebook-auth-logo.svg";
import appleLogo from "/apple-auth-logo.svg";
import { Link } from "react-router-dom";
import { Route } from "../../../../shared/constants/constants";
import { useRegistration } from "../model/useRegistration";

export const RegistrationForm = () => {
  const { email, handleChange } = useRegistration();
  return (
    <div className="flex flex-col items-center text-center w-[375px]">
      <img src={spotifyLogo} alt="spotify logo" className="w-12 h-12 mb-4" />
      <h1 className="text-[40px] font-bold mb-10">
        Зарегистрируйтесь и погрузитесь в музыку
      </h1>
      <form
        action=""
        className="flex flex-col gap-2 items-left border-b border-zinc-500 pb-10 text-left w-full relative"
      >
        <label htmlFor="email">Электронная почта</label>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="name@domain.com"
          className="rounded-sm w-full py-2 px-4 outline-none border border-zinc-500 hover:border-white mb-5"
        />
        <button
          type="submit"
          className="text-black font-bold rounded-full bg-green-400 hover:bg-[#74eda0] py-3 px-10 cursor-pointer"
        >
          Далее
        </button>
        <p className="absolute bottom-[-18px] right-1/2 translate-x-1/2 bg-black rounded-full py-2 px-3">
          или
        </p>
      </form>
      <div className="flex flex-col w-full font-bold gap-2 border-b border-zinc-800 py-8 mb-8">
        <button className="flex items-center border border-zinc-500 hover:border-white cursor-pointer rounded-full py-2 px-7">
          <img src={googleLogo} alt="google logo" className="w-5 h-5" />
          <p className="mx-auto px-8">Зарегистрируйтесь через Google</p>
        </button>
        <button className="flex items-center border border-zinc-500 hover:border-white cursor-pointer rounded-full py-2 px-7">
          <img src={facebookLogo} alt="facebook logo" className="w-6 h-6" />
          <p className="mx-auto px-8">Зарегистрируйтесь через Facebook</p>
        </button>
        <button className="flex items-center border border-zinc-500 hover:border-white cursor-pointer rounded-full py-2 px-7">
          <img src={appleLogo} alt="apple logo" className="w-5 h-5" />
          <p className="mx-auto px-8">Войти через Apple</p>
        </button>
      </div>
      <p className="text-zinc-400">
        Уже есть аккаунт?{" "}
        <Link to={Route.LOGIN} className="text-white underline">
          Войдите в него
        </Link>
        .
      </p>
    </div>
  );
};
