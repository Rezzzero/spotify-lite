import { useState } from "react";
import { isValidEmail } from "../../../../shared/lib/validators/IsValidEmail";
import {
  hasLetter,
  hasNumberOrSpecial,
} from "../../../../shared/lib/validators/isValidPassword";
import { UserInfoKey } from "./types/NewUser";
import { ERROR_MESSAGES } from "../../../../shared/constants/errors";
import {
  initialStepErrors,
  initialUserInfo,
  initialUserInfoBlur,
  initialUserInfoErrors,
} from "./state/InitialStates";

export const useRegistration = () => {
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [userInfoBlur, setUserInfoBlur] = useState(initialUserInfoBlur);
  const [userInfoErrors, setUserInfoErrors] = useState(initialUserInfoErrors);
  const [stepErrors, setStepErrors] = useState(initialStepErrors);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(0);

  const handleChangeUserInfo = (
    eOrValue: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
    field: UserInfoKey,
    additional: boolean,
    errorMessage: string,
    blur: boolean
  ) => {
    const newValue =
      typeof eOrValue === "string" ? eOrValue : eOrValue.target.value;
    setUserInfo((prev) => ({ ...prev, [field]: newValue }));

    if (additional) {
      setStepErrors((prev) => ({
        ...prev,
        additionalInfo: {
          ...prev.additionalInfo,
          [field]: false,
        },
      }));
    } else {
      setStepErrors({ ...stepErrors, [field]: false });
    }

    if (userInfoBlur[field] && blur) {
      if (field === "password") {
        setUserInfoErrors((prev) => ({
          ...prev,
          password: {
            noLetter: !hasLetter(newValue),
            noNumberOrSpecial: !hasNumberOrSpecial(newValue),
            tooShort: newValue.length < 10,
          },
        }));
        return;
      }

      const isValid =
        field === "email" ? isValidEmail(newValue) : Boolean(newValue);

      setUserInfoErrors((prev) => ({
        ...prev,
        [field]: {
          status: !isValid,
          message: isValid ? "" : errorMessage,
        },
      }));
    }
  };

  const createHandleChange =
    (
      field: UserInfoKey,
      additional: boolean,
      errorMessage: string,
      blur: boolean
    ) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleChangeUserInfo(e, field, additional, errorMessage, blur);
    };

  const onUserInfoBlur = (field: UserInfoKey, errorMessage?: string) => {
    setUserInfoBlur((prev) => ({ ...prev, [field]: true }));
    const value = userInfo[field];
    if (field === "email") checkEmailErrors();
    if (field === "password") checkPasswordErrors();
    if (field !== "email" && field !== "password") {
      if (!value) {
        setUserInfoErrors({
          ...userInfoErrors,
          [field]: {
            status: true,
            message: errorMessage,
          },
        });
      }
    }
  };

  const checkEmailErrors = () => {
    setUserInfoErrors({
      ...userInfoErrors,
      email: {
        status: !isValidEmail(userInfo.email),
        message: isValidEmail(userInfo.email) ? "" : ERROR_MESSAGES.email,
      },
    });
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

  const isValidPassword =
    userInfo.password.length >= 10 &&
    hasLetter(userInfo.password) &&
    hasNumberOrSpecial(userInfo.password);

  const handleNextStep = () => {
    if (step === 0) {
      if (!isValidEmail(userInfo.email)) {
        checkEmailErrors();
        setStepErrors({ ...stepErrors, email: true });
      } else {
        setUserInfoErrors({
          ...userInfoErrors,
          email: initialUserInfoErrors.email,
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
          password: initialUserInfoErrors.password,
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
        password: initialUserInfoErrors.password,
      });
      setUserInfoBlur({ ...userInfoBlur, password: false });
      setStepErrors({ ...stepErrors, password: false });
    }
    if (step === 2) {
      setUserInfoBlur({ ...userInfoBlur, userName: false });
      setUserInfoErrors({
        ...userInfoErrors,
        userName: initialUserInfoErrors.userName,
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
    step,
    showPassword,
    handleNextStep,
    handlePrevStep,
    handleShowPassword,
    onUserInfoBlur,
    handleChangeUserInfo,
    createHandleChange,
  };
};
