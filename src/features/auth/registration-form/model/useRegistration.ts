import { useState } from "react";
import { isValidEmail } from "../../../../shared/lib/validators/IsValidEmail";
import {
  hasLetter,
  hasNumberOrSpecial,
} from "../../../../shared/lib/validators/isValidPassword";
import {
  StepErrors,
  UserInfo,
  UserInfoBlur,
  UserInfoErrors,
} from "./types/NewUser";

const emailErrorMessage =
  "Адрес электронной почты недействителен. Убедитесь, что он указан в таком формате: example@email.com.";
const userNameErrorMessage = "Укажите имя для своего профиля.";
const birthdayErrorMessage = "Укажите дату рождения.";
const monthErrorMessage = "Выберите месяц.";
const yearErrorMessage =
  "Год рождения должен состоять из четырех цифр (например, 1990)";

export const useRegistration = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
    userName: "",
    birthday: null,
    monthOfBirthday: null,
    yearOfBirthday: null,
    gender: "",
  });
  const [userInfoBlur, setUserInfoBlur] = useState<UserInfoBlur>({
    email: false,
    password: false,
    userName: false,
    birthday: false,
    monthOfBirthday: false,
    yearOfBirthday: false,
  });
  const [userInfoErrors, setUserInfoErrors] = useState<UserInfoErrors>({
    email: {
      status: false,
      message: "",
    },
    password: {
      noLetter: false,
      noNumberOrSpecial: false,
      tooShort: false,
    },
    userName: {
      status: false,
      message: "",
    },
    birthday: {
      status: false,
      message: "",
    },
    monthOfBirthday: {
      status: false,
      message: "",
    },
    yearOfBirthday: {
      status: false,
      message: "",
    },
    gender: {
      status: false,
      message: "",
    },
  });
  const [stepErrors, setStepErrors] = useState<StepErrors>({
    email: false,
    password: false,
    additionalInfo: {
      userName: false,
      birthday: false,
      monthOfBirthday: false,
      yearOfBirthday: false,
      gender: false,
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(0);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setUserInfo({ ...userInfo, email: newEmail });
    setStepErrors({ ...stepErrors, email: false });

    if (userInfoBlur.email) {
      setUserInfoErrors({
        ...userInfoErrors,
        email: {
          status: !isValidEmail(newEmail),
          message: isValidEmail(newEmail) ? "" : emailErrorMessage,
        },
      });
    }
  };

  const onEmailInputBlur = () => {
    setUserInfoBlur({ ...userInfoBlur, email: true });
    checkEmailErrors();
  };

  const checkEmailErrors = () => {
    setUserInfoErrors({
      ...userInfoErrors,
      email: {
        status: !isValidEmail(userInfo.email),
        message: isValidEmail(userInfo.email) ? "" : emailErrorMessage,
      },
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setUserInfo({ ...userInfo, password: newPassword });
    setStepErrors({ ...stepErrors, password: false });

    if (userInfoBlur.password) {
      setUserInfoErrors({
        ...userInfoErrors,
        password: {
          noLetter: !hasLetter(newPassword),
          noNumberOrSpecial: !hasNumberOrSpecial(newPassword),
          tooShort: newPassword.length < 10,
        },
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const checkPasswordErrors = () => {
    setUserInfoErrors({
      ...userInfoErrors,
      password: {
        noLetter: !hasLetter(userInfo.password),
        noNumberOrSpecial: !hasNumberOrSpecial(userInfo.password),
        tooShort: userInfo.password.length < 10,
      },
    });
  };

  const onPasswordInputBlur = () => {
    setUserInfoBlur({ ...userInfoBlur, password: true });
    checkPasswordErrors();
  };

  const isValidPassword =
    userInfo.password.length >= 10 &&
    hasLetter(userInfo.password) &&
    hasNumberOrSpecial(userInfo.password);

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = e.target.value;
    setUserInfo({ ...userInfo, userName: newUserName });
    setStepErrors((prev) => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        userName: false,
      },
    }));

    if (userInfoBlur.userName) {
      setUserInfoErrors({
        ...userInfoErrors,
        userName: {
          status: !newUserName,
          message: newUserName ? "" : userNameErrorMessage,
        },
      });
    }
  };

  const onUserNameInputBlur = () => {
    setUserInfoBlur({ ...userInfoBlur, userName: true });
    if (!userInfo.userName) {
      setUserInfoErrors({
        ...userInfoErrors,
        userName: {
          status: true,
          message: userNameErrorMessage,
        },
      });
    }
  };

  const handleChangeBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBirthday = e.target.value;
    setUserInfo({ ...userInfo, birthday: Number(newBirthday) });
    setStepErrors((prev) => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        birthday: false,
      },
    }));

    if (userInfoBlur.birthday) {
      setUserInfoErrors({
        ...userInfoErrors,
        birthday: {
          status: !newBirthday,
          message: newBirthday ? "" : birthdayErrorMessage,
        },
      });
    }
  };

  const onBirthdayInputBlur = () => {
    if (!userInfo.birthday) {
      setUserInfoErrors({
        ...userInfoErrors,
        birthday: {
          status: true,
          message: birthdayErrorMessage,
        },
      });
    }
  };

  const handleChangeYearOfBirthday = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newYearOfBirthday = e.target.value;
    setUserInfo({ ...userInfo, yearOfBirthday: Number(newYearOfBirthday) });
    setStepErrors((prev) => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        yearOfBirthday: false,
      },
    }));

    if (userInfoBlur.yearOfBirthday) {
      setUserInfoErrors({
        ...userInfoErrors,
        yearOfBirthday: {
          status: !newYearOfBirthday,
          message: newYearOfBirthday ? "" : yearErrorMessage,
        },
      });
    }
  };

  const onYearOfBirthdayInputBlur = () => {
    if (!userInfo.yearOfBirthday) {
      setUserInfoErrors({
        ...userInfoErrors,
        yearOfBirthday: {
          status: true,
          message: yearErrorMessage,
        },
      });
    }
  };

  const handleChangeMonthOfBirthday = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newMonthOfBirthday = e.target.value;
    setUserInfo({ ...userInfo, monthOfBirthday: Number(newMonthOfBirthday) });
    setStepErrors((prev) => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        monthOfBirthday: false,
      },
    }));

    if (userInfoBlur.monthOfBirthday) {
      setUserInfoErrors({
        ...userInfoErrors,
        monthOfBirthday: {
          status: !newMonthOfBirthday,
          message: newMonthOfBirthday ? "" : monthErrorMessage,
        },
      });
    }
  };

  const onMonthOfBirthdayInputBlur = () => {
    if (!userInfo.monthOfBirthday) {
      setUserInfoErrors({
        ...userInfoErrors,
        monthOfBirthday: {
          status: true,
          message: monthErrorMessage,
        },
      });
    }
  };

  const handleNextStep = () => {
    if (step === 0) {
      if (!isValidEmail(userInfo.email)) {
        checkEmailErrors();
        setStepErrors({ ...stepErrors, email: true });
      } else {
        setUserInfoErrors({
          ...userInfoErrors,
          email: { status: false, message: "" },
        });
        setStep(1);
        setStepErrors({ ...stepErrors, email: false });
      }
    }
    if (step === 1) {
      if (!isValidPassword) {
        checkPasswordErrors();
        setStepErrors({ ...stepErrors, password: true });
      } else {
        setUserInfoErrors({
          ...userInfoErrors,
          password: {
            noLetter: false,
            noNumberOrSpecial: false,
            tooShort: false,
          },
        });
        setStep(2);
        setStepErrors({ ...stepErrors, password: false });
      }
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
    if (step === 1) {
      setUserInfoErrors({
        ...userInfoErrors,
        password: {
          noLetter: false,
          noNumberOrSpecial: false,
          tooShort: false,
        },
      });
      setUserInfoBlur({ ...userInfoBlur, password: false });
      setStepErrors({ ...stepErrors, password: false });
    }
    if (step === 2) {
      setUserInfoBlur({ ...userInfoBlur, userName: false });
      setUserInfoErrors({
        ...userInfoErrors,
        userName: {
          status: false,
          message: "",
        },
      });
      setStepErrors((prev) => ({
        ...prev,
        additionalInfo: {
          ...prev.additionalInfo,
          userName: false,
        },
      }));
    }
  };

  return {
    userInfo,
    userInfoBlur,
    userInfoErrors,
    stepErrors,
    handleChangeEmail,
    handleChangePassword,
    step,
    handleNextStep,
    handlePrevStep,
    showPassword,
    handleShowPassword,
    onPasswordInputBlur,
    onEmailInputBlur,
    handleChangeUserName,
    onUserNameInputBlur,
    handleChangeBirthday,
    onBirthdayInputBlur,
    handleChangeMonthOfBirthday,
    onMonthOfBirthdayInputBlur,
    handleChangeYearOfBirthday,
    onYearOfBirthdayInputBlur,
  };
};
