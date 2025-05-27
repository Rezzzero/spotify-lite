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

export const useRegistration = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userName: "",
    email: "",
    password: "",
  });
  const [userInfoBlur, setUserInfoBlur] = useState<UserInfoBlur>({
    userName: false,
    email: false,
    password: false,
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
  });
  const [stepErrors, setStepErrors] = useState<StepErrors>({
    email: false,
    password: false,
    userName: false,
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
    setStepErrors({ ...stepErrors, userName: false });

    if (userInfoBlur.userName) {
      setUserInfoErrors({
        ...userInfoErrors,
        userName: {
          status: !newUserName,
          message: newUserName ? "" : "Укажите имя для своего профиля.",
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
          message: "Укажите имя для своего профиля.",
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
      setStepErrors({ ...stepErrors, userName: false });
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
  };
};
