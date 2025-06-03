import { Link } from "react-router-dom";
import spotifyLogo from "/spotify-logo.svg";
import googleLogo from "/google-auth-logo.svg";
import facebookLogo from "/facebook-auth-logo.svg";
import appleLogo from "/apple-auth-logo.svg";
import errorIcon from "../../../../shared/assets/auth/error-icon.svg";
import wrongEmailOrPasswordIcon from "../../../../shared/assets/auth/wrong-email-or-password-icon.svg";
import { Route } from "../../../../shared/constants/constants";
import { useLogin } from "../model/useLogin";
import ShowPasswordIcon from "../../../../shared/assets/auth/password-show-icon.svg?react";
import HidePasswordIcon from "../../../../shared/assets/auth/password-hide-icon.svg?react";
import { OTPInput } from "../../../../shared/ui/otp-input/OTPInput";
import { CustomInput } from "../../../../shared/ui/custom-input/CustomInput";

export const LoginForm = () => {
  const {
    register,
    createOnChange,
    errors,
    otp,
    inputRefs,
    handleChangeOtp,
    handleOtpKeyDown,
    handleOtpPaste,
    sendOtp,
    verifyStep,
    setVerifyStep,
    verifyOtp,
    loading,
    withPassword,
    setWithPassword,
    showPassword,
    handleShowPassword,
    signInWithPassword,
    coveredEmail,
    otpError,
    signInError,
  } = useLogin();
  return (
    <div className="flex flex-col items-center bg-[#121212] rounded-md gap-5 pt-10 pb-15 px-12">
      {!verifyStep ? (
        <>
          <img src={spotifyLogo} alt="spotify logo" className="w-10 h-10" />
          <h1 className="text-3xl font-bold mb-4">Войти в Spotify Lite</h1>
          {signInError.status && (
            <div className="flex w-full items-center gap-2 bg-red-500 text-white px-5 py-3">
              <img
                src={wrongEmailOrPasswordIcon}
                alt="wrong email or password"
                className="w-5 h-5"
              />
              <p>{signInError.message}</p>
            </div>
          )}
          <div className="flex flex-col font-bold gap-2 px-25 border-b border-zinc-800 pb-8 mx-10">
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
          <form
            onSubmit={(e) => e.preventDefault()}
            action=""
            className="flex flex-col w-full gap-2 mb-5 px-35"
          >
            <label htmlFor="email" className="text-sm font-bold w-full">
              Электронная почта или имя пользователя
            </label>
            <CustomInput
              type="email"
              id="email"
              error={errors.email}
              placeholder="Электронная почта или имя пользователя"
              register={register("email", {
                required:
                  "Адрес электронной почты или имя пользователя не привязаны к учетной записи Spotify Lite",
                onChange: () => {
                  createOnChange("email")();
                },
              })}
            />
            {withPassword && (
              <div className="relative flex flex-col gap-2 w-full">
                <label htmlFor="password" className="text-sm font-bold w-full">
                  Пароль
                </label>
                <CustomInput
                  type="password"
                  id="password"
                  error={errors.password}
                  placeholder="Пароль"
                  showPassword={showPassword}
                  register={register("password", {
                    required: "Пароль не может быть пустым",
                    onChange: () => {
                      createOnChange("password")();
                    },
                  })}
                />
                {showPassword && (
                  <ShowPasswordIcon
                    className="w-6 h-6 text-zinc-400 hover:text-white hover:scale-102 absolute right-3 top-11 cursor-pointer"
                    onClick={handleShowPassword}
                  />
                )}
                {!showPassword && (
                  <HidePasswordIcon
                    className="w-6 h-6 text-zinc-400 hover:text-white hover:scale-102 absolute right-3 top-11 cursor-pointer"
                    onClick={handleShowPassword}
                  />
                )}
              </div>
            )}
            {errors.email && (
              <div className="flex items-start gap-1 mb-3 max-w-[300px]">
                <img src={errorIcon} alt="error icon" className="mt-[2px]" />
                <p className="text-sm font-semibold text-rose-400">
                  {errors.email.message}
                </p>
              </div>
            )}

            {withPassword ? (
              <>
                <button
                  type="submit"
                  onClick={signInWithPassword}
                  className="text-black font-bold rounded-full bg-green-400 hover:bg-[#74eda0] hover:scale-105 py-3 px-10 cursor-pointer mb-5"
                >
                  {loading ? "Загрузка..." : "Войти"}
                </button>
                <button
                  type="submit"
                  onClick={sendOtp}
                  className="underline cursor-pointer hover:text-green-400"
                >
                  Вход без пароля
                </button>
              </>
            ) : (
              <button
                type="submit"
                onClick={sendOtp}
                className="text-black font-bold rounded-full bg-green-400 hover:bg-[#74eda0] hover:scale-105 py-3 px-10 cursor-pointer"
              >
                {loading ? "Загрузка..." : "Продолжить"}
              </button>
            )}
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
        </>
      ) : (
        <div className="flex flex-col max-w-[300px]">
          <h1 className="text-xl font-bold mb-4">
            Введите 6-значный код, который мы отправили на адрес {coveredEmail}
          </h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center gap-5 mb-10"
          >
            <OTPInput
              otp={otp}
              otpError={otpError}
              inputRefs={inputRefs}
              handleChangeOtp={handleChangeOtp}
              handleOtpKeyDown={handleOtpKeyDown}
              handleOtpPaste={handleOtpPaste}
            />
            {otpError.status && (
              <div className="flex items-start self-start gap-1 mb-3">
                <img src={errorIcon} alt="error icon" className="mt-[2px]" />
                <p className="text-sm font-semibold text-rose-400">
                  {otpError.message}
                </p>
              </div>
            )}
            <button
              type="submit"
              onClick={sendOtp}
              className="font-bold border border-zinc-500 hover:border-white py-1 px-3 rounded-full hover:scale-105 cursor-pointer mb-3"
            >
              получить новый код
            </button>
            <button
              type="submit"
              onClick={verifyOtp}
              className="text-black font-bold w-full rounded-full bg-green-400 hover:bg-[#74eda0] hover:scale-105 py-3 px-10 cursor-pointer"
            >
              Войти
            </button>
          </form>
          <button
            type="button"
            onClick={() => {
              setWithPassword(true);
              setVerifyStep(false);
            }}
            className="font-bold hover:scale-105 cursor-pointer"
          >
            Войти с помощью пароля
          </button>
        </div>
      )}
    </div>
  );
};
