/// <reference types="vite-plugin-svgr/client" />

import spotifyLogo from "/spotify-logo.svg";
import googleLogo from "/google-auth-logo.svg";
import facebookLogo from "/facebook-auth-logo.svg";
import appleLogo from "/apple-auth-logo.svg";
import { Link } from "react-router-dom";
import { Route } from "../../../../shared/constants/constants";
import { useRegistration } from "../model/useRegistration";
import ShowPasswordIcon from "../../../../shared/assets/auth/password-show-icon.svg?react";
import HidePasswordIcon from "../../../../shared/assets/auth/password-hide-icon.svg?react";
import { RoundedCheckbox } from "../../../../shared/ui/rounded-checkbox/RoundedCheckbox";
import {
  hasLetter,
  hasNumberOrSpecial,
} from "../../../../shared/lib/validators/isValidPassword";
import { LinearProgress } from "@mui/material";
import PrevArrowIcon from "../../../../shared/assets/auth/arrow-prev.svg?react";
import { CustomInput } from "../../../../shared/ui/custom-input/CustomInput";
import { isValidEmail } from "../../../../shared/lib/validators/IsValidEmail";

export const RegistrationForm = () => {
  const {
    email,
    handleChangeEmail,
    password,
    handleChangePassword,
    handleNextStep,
    handlePrevStep,
    handleShowPassword,
    showPassword,
    step,
    passwordErrors,
    passwordInputBlur,
    onPasswordInputBlur,
    emailInputBlur,
    setEmailInputBlur,
  } = useRegistration();

  const passwordInvalid =
    !hasLetter(password) ||
    !hasNumberOrSpecial(password) ||
    password.length < 10;

  const emailInvalid = !isValidEmail(email);

  return (
    <div
      className={`flex flex-col items-center text-center w-[435px] ${
        step === 0 ? "px-15" : "px-0"
      }`}
    >
      <img src={spotifyLogo} alt="spotify logo" className="w-12 h-12 mb-4" />
      {step === 0 && (
        <h1 className="text-[40px] font-bold mb-10">
          Зарегистрируйтесь и погрузитесь в музыку
        </h1>
      )}
      {step !== 0 && (
        <>
          <LinearProgress
            variant="determinate"
            value={step * 33.3}
            className="w-full my-4 bg-[#4ADE80]"
            sx={{
              height: 2,
              backgroundColor: "rgba(209, 209, 209, 0.5)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#4ade80",
              },
            }}
          />
          <div className="flex w-full items-center gap-5 px-5 mb-6">
            <PrevArrowIcon
              onClick={handlePrevStep}
              className="w-5 h-5 cursor-pointer text-gray-300 hover:text-white"
            />
            <div className="flex flex-col text-left">
              <h2 className="text-lg font-semibold text-zinc-400">
                Шаг {step} из 3
              </h2>
              {step === 1 && <p className="font-bold">Придумайте пароль</p>}
            </div>
          </div>
        </>
      )}
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className={`flex flex-col gap-2 items-left ${
          step === 0 ? "border-b border-zinc-500" : "px-15"
        } pb-10 text-left w-full relative`}
      >
        {step === 0 && (
          <>
            <label htmlFor="email" className="font-bold">
              Электронная почта
            </label>
            <CustomInput
              type="email"
              id="email"
              value={email}
              onChange={handleChangeEmail}
              onInputBlur={setEmailInputBlur}
              placeholder="name@domain.com"
              inputBlured={emailInputBlur}
              valueInvalid={emailInvalid}
            />
          </>
        )}
        {step === 1 && (
          <>
            <label htmlFor="password" className="font-bold">
              Пароль
            </label>
            <CustomInput
              type="password"
              id="password"
              value={password}
              onChange={handleChangePassword}
              onInputBlur={onPasswordInputBlur}
              placeholder=""
              inputBlured={passwordInputBlur}
              valueInvalid={passwordInvalid}
              showPassword={showPassword}
            />
            {showPassword && (
              <ShowPasswordIcon
                className="w-6 h-6 text-zinc-400 hover:text-white hover:scale-105 absolute right-18 top-11 cursor-pointer"
                onClick={handleShowPassword}
              />
            )}
            {!showPassword && (
              <HidePasswordIcon
                className="w-6 h-6 text-zinc-400 hover:text-white hover:scale-105 absolute right-18 top-11 cursor-pointer"
                onClick={handleShowPassword}
              />
            )}
            <div className="flex flex-col gap-3 mb-7">
              <h2 className="font-bold text-sm">
                Пароль должен содержать как минимум:
              </h2>
              <div className="flex gap-1 items-start">
                <RoundedCheckbox checked={hasLetter(password)} />
                <p
                  className={`text-sm leading-none ${
                    passwordErrors.noLetter ? "text-rose-400" : ""
                  } `}
                >
                  1 букву
                </p>
              </div>
              <div className="flex gap-1 items-start">
                <RoundedCheckbox checked={hasNumberOrSpecial(password)} />
                <p
                  className={`text-sm leading-none ${
                    passwordErrors.noNumberOrSpecial ? "text-rose-400" : ""
                  }`}
                >
                  1 цифру или специальный символ (например, # ? ! &)
                </p>
              </div>
              <div className="flex gap-1 items-start">
                <RoundedCheckbox checked={password.length >= 10} />
                <p
                  className={`text-sm leading-none ${
                    passwordErrors.tooShort ? "text-rose-400" : ""
                  }`}
                >
                  10 символов
                </p>
              </div>
            </div>
          </>
        )}
        <button
          type="button"
          onClick={handleNextStep}
          className="text-black font-bold rounded-full bg-green-400 hover:bg-[#74eda0] py-3 px-10 cursor-pointer"
        >
          Далее
        </button>
        {step === 0 && (
          <p className="absolute bottom-[-18px] right-1/2 translate-x-1/2 bg-black rounded-full py-2 px-3">
            или
          </p>
        )}
      </form>
      {step === 0 && (
        <>
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
        </>
      )}
    </div>
  );
};
