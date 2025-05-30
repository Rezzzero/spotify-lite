import spotifyLogo from "/spotify-logo.svg";
import googleLogo from "/google-auth-logo.svg";
import facebookLogo from "/facebook-auth-logo.svg";
import appleLogo from "/apple-auth-logo.svg";
import errorIcon from "../../../../shared/assets/auth/error-icon.svg";
import PrevArrowIcon from "../../../../shared/assets/auth/arrow-prev.svg?react";
import ShowPasswordIcon from "../../../../shared/assets/auth/password-show-icon.svg?react";
import HidePasswordIcon from "../../../../shared/assets/auth/password-hide-icon.svg?react";
import { ERROR_MESSAGES } from "../../../../shared/constants/errors";
import { LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { GENDERS, Route } from "../../../../shared/constants/constants";
import { RoundedCheckbox } from "../../../../shared/ui/rounded-checkbox/RoundedCheckbox";
import {
  hasLetter,
  hasNumberOrSpecial,
  isLongEnough,
} from "../../../../shared/lib/validators/isValidPassword";
import { GenderCheckbox } from "../../../../shared/ui/gender-checkbox/GenderCheckbox";
import { useRegistrationForm } from "../model/useRegistration";
import { CustomInput } from "../../../../shared/ui/custom-input/CustomInput";
import { SelectMonth } from "../../../../shared/ui/month-select/SelectMonth";

export const RegistrationForm = () => {
  const {
    step,
    register,
    createOnChange,
    createOnBlur,
    errors,
    handleNextStep,
    handlePrevStep,
    showPassword,
    handleShowPassword,
    passwordValue,
    userInfoBlur,
    currentGender,
    handleGenderSelect,
  } = useRegistrationForm();
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
              {step === 2 && <p className="font-bold">Расскажите о себе</p>}
            </div>
          </div>
        </>
      )}
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className={`flex flex-col gap-3 items-left ${
          step === 0 ? "border-b border-zinc-500" : "px-15"
        } pb-10 text-left w-full relative`}
      >
        {step === 0 && (
          <label htmlFor="email" className="font-bold">
            Электронная почта
            <CustomInput
              type="email"
              id="email"
              error={errors.email}
              placeholder="name@domain.com"
              register={register("email", {
                required: ERROR_MESSAGES.email,
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: ERROR_MESSAGES.email,
                },
                onChange: () => {
                  createOnChange("email")();
                },
                onBlur: () => {
                  createOnBlur("email")();
                },
              })}
            />
            {errors.email && (
              <div className="flex items-start mt-2 gap-1 mb-3">
                <img src={errorIcon} alt="error icon" className="mt-[2px]" />
                <p className="text-sm font-semibold text-rose-400">
                  {errors.email.message}
                </p>
              </div>
            )}
          </label>
        )}

        {step === 1 && (
          <>
            <label htmlFor="password" className="font-bold">
              Пароль
              <CustomInput
                type="password"
                id="password"
                error={errors.password}
                placeholder=""
                showPassword={showPassword}
                register={register("password", {
                  required: "Пароль обязателен",
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*[\d#?!&]).{10,}$/,
                    message:
                      "Пароль должен содержать как минимум: 1 букву, 1 цифру или спецсимвол, минимум 10 символов",
                  },
                  onChange: () => {
                    createOnChange("password")();
                  },
                  onBlur: () => {
                    createOnBlur("password")();
                  },
                })}
              />
            </label>
            {showPassword && (
              <ShowPasswordIcon
                className="w-6 h-6 text-zinc-400 hover:text-white hover:scale-105 absolute right-18 top-10 cursor-pointer"
                onClick={handleShowPassword}
              />
            )}
            {!showPassword && (
              <HidePasswordIcon
                className="w-6 h-6 text-zinc-400 hover:text-white hover:scale-105 absolute right-18 top-10 cursor-pointer"
                onClick={handleShowPassword}
              />
            )}
            <div className="flex flex-col gap-3 mb-7">
              <h2 className="font-bold text-sm">
                Пароль должен содержать как минимум:
              </h2>
              <div className="flex gap-1 items-start">
                <RoundedCheckbox checked={hasLetter(passwordValue)} />
                <p
                  className={`text-sm leading-none ${
                    !hasLetter(passwordValue) && userInfoBlur.password
                      ? "text-rose-400"
                      : ""
                  } `}
                >
                  1 букву
                </p>
              </div>
              <div className="flex gap-1 items-start">
                <RoundedCheckbox checked={hasNumberOrSpecial(passwordValue)} />
                <p
                  className={`text-sm leading-none ${
                    !hasNumberOrSpecial(passwordValue) && userInfoBlur.password
                      ? "text-rose-400"
                      : ""
                  }`}
                >
                  1 цифру или специальный символ (например, # ? ! &)
                </p>
              </div>
              <div className="flex gap-1 items-start">
                <RoundedCheckbox checked={isLongEnough(passwordValue)} />
                <p
                  className={`text-sm leading-none ${
                    !isLongEnough(passwordValue) && userInfoBlur.password
                      ? "text-rose-400"
                      : ""
                  }`}
                >
                  10 символов
                </p>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="font-bold text-sm leading-none"
              >
                Название
                <p className="text-sm font-normal text-zinc-400">
                  Ваше имя появится в профиле.
                </p>
                <CustomInput
                  type="text"
                  id="username"
                  error={errors.userName}
                  placeholder=""
                  register={register("userName", {
                    required: ERROR_MESSAGES.userName,
                    onChange: () => {
                      createOnChange("userName")();
                    },
                    onBlur: () => {
                      createOnBlur("userName")();
                    },
                  })}
                />
                {errors.userName && (
                  <div className="flex items-start mt-2 gap-1 mb-3">
                    <img
                      src={errorIcon}
                      alt="error icon"
                      className="mt-[2px]"
                    />
                    <p className="text-sm font-semibold text-rose-400">
                      {errors.userName.message}
                    </p>
                  </div>
                )}
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="birthday"
                className="font-bold text-sm leading-none"
              >
                Дата рождения
                <p className="text-sm font-normal text-zinc-400">
                  Зачем указывать дату рождения?
                </p>
              </label>
              <div className="grid grid-cols-[60px_auto_80px] items-center gap-2">
                <CustomInput
                  type="number"
                  id="birthday"
                  error={errors.birthday}
                  placeholder="дд"
                  register={register("birthday", {
                    required: "Укажите дату рождения.",
                    onChange: (e) => {
                      const raw = e.target.value;
                      const onlyDigits = raw.replace(/\D/g, "").slice(0, 2);
                      e.target.value = onlyDigits;

                      createOnChange("birthday")();
                    },
                    onBlur: () => {
                      createOnBlur("birthday")();
                    },
                    validate: (value) => {
                      const num = Number(value);
                      if (num < 1 || num > 31) return ERROR_MESSAGES.birthday;
                      return true;
                    },
                  })}
                />
                <SelectMonth
                  error={errors.monthOfBirthday}
                  register={register("monthOfBirthday", {
                    required: "Укажите месяц рождения.",
                    onChange: () => {
                      createOnChange("monthOfBirthday")();
                    },
                    onBlur: () => {
                      createOnBlur("monthOfBirthday")();
                    },
                    validate: (value) => {
                      const num = Number(value);
                      if (num < 1 || num > 12) return ERROR_MESSAGES.month;
                      return true;
                    },
                  })}
                />
                <CustomInput
                  type="number"
                  id="yearOfBirthday"
                  error={errors.yearOfBirthday}
                  placeholder="гггг"
                  register={register("yearOfBirthday", {
                    required:
                      "Год рождения должен состоять из четырех цифр (например, 1990)",
                    onChange: (e) => {
                      const raw = e.target.value;
                      const onlyDigits = raw.replace(/\D/g, "").slice(0, 4);
                      e.target.value = onlyDigits;

                      createOnChange("yearOfBirthday")();
                    },
                    onBlur: () => {
                      createOnBlur("yearOfBirthday")();
                    },
                    validate: (value) => {
                      const year = Number(value);
                      const currentYear = new Date().getFullYear();

                      if (year < 1900)
                        return "Год рождения должен быть не ранее 1900 г.";
                      if (year > currentYear)
                        return "Год рождения не может быть в будущем";

                      const age = currentYear - year;
                      if (age < 14)
                        return "Вы еще не достигли возраста, позволяющего создать аккаунт Spotify.";

                      return true;
                    },
                  })}
                />
              </div>
            </div>
            <div>
              {errors.birthday && (
                <div className="flex items-start gap-1 mb-3">
                  <img src={errorIcon} alt="error icon" className="mt-[2px]" />
                  <p className="text-sm font-semibold text-rose-400">
                    {errors.birthday.message}
                  </p>
                </div>
              )}
              {errors.monthOfBirthday && (
                <div className="flex items-start gap-1 mb-3">
                  <img src={errorIcon} alt="error icon" className="mt-[2px]" />
                  <p className="text-sm font-semibold text-rose-400">
                    {errors.monthOfBirthday.message}
                  </p>
                </div>
              )}
              {errors.yearOfBirthday && (
                <div className="flex items-start gap-1 mb-3">
                  <img src={errorIcon} alt="error icon" className="mt-[2px]" />
                  <p className="text-sm font-semibold text-rose-400">
                    {errors.yearOfBirthday.message}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 mb-7">
              <p className="font-bold text-sm leading-none">Пол</p>
              <p className="text-sm font-normal text-zinc-400">
                Мы учитываем пол при подборе персональных рекомендаций и
                рекламы.
              </p>

              <input
                type="hidden"
                {...register("gender", { required: "Укажите пол." })}
              />

              <div className="flex flex-wrap gap-3">
                {Object.values(GENDERS).map((gender) => (
                  <button
                    key={gender.value}
                    type="button"
                    onClick={() => handleGenderSelect(gender.value)}
                    className="flex gap-3 items-center text-sm mr-5 group"
                  >
                    <GenderCheckbox checked={gender.value === currentGender} />
                    {gender.name}
                  </button>
                ))}
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
