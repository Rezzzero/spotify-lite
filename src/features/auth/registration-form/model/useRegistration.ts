import { useState } from "react";
import { isValidEmail } from "../../../../shared/lib/validators/IsValidEmail";
import {
  hasLetter,
  hasNumberOrSpecial,
} from "../../../../shared/lib/validators/isValidPassword";

export const useRegistration = () => {
  const [emailInvalidError, setEmailInvalidError] = useState<{
    status: boolean;
    message: string;
  }>({ status: false, message: "" });
  const [emailInputBlur, setEmailInputBlur] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [passwordErrors, setPasswordErrors] = useState<{
    noLetter: boolean;
    noNumberOrSpecial: boolean;
    tooShort: boolean;
  }>({
    noLetter: false,
    noNumberOrSpecial: false,
    tooShort: false,
  });
  const [passwordInputBlur, setPasswordInputBlur] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (passwordInputBlur) {
      setPasswordErrors({
        noLetter: !hasLetter(newPassword),
        noNumberOrSpecial: !hasNumberOrSpecial(newPassword),
        tooShort: newPassword.length < 10,
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onPasswordInputBlur = (blurred: boolean) => {
    if (blurred) {
      setPasswordInputBlur(true);
      setPasswordErrors({
        noLetter: !hasLetter(password),
        noNumberOrSpecial: !hasNumberOrSpecial(password),
        tooShort: password.length < 10,
      });
    }
  };

  const isValidPassword =
    password.length >= 10 &&
    hasLetter(password) &&
    hasNumberOrSpecial(password);

  const handleNextStep = () => {
    if (step === 0) {
      if (!isValidEmail(email)) {
        setEmailInvalidError({
          status: true,
          message:
            "Адрес электронной почты недействителен. Убедитесь, что он указан в таком формате: example@email.com.",
        });
      } else {
        setStep(1);
      }
    }
    if (step === 1) {
      if (isValidPassword) {
        setStep(2);
      }
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
    if (step === 1) {
      setPasswordErrors({
        noLetter: false,
        noNumberOrSpecial: false,
        tooShort: false,
      });
      setPasswordInputBlur(false);
    }
  };

  return {
    email,
    handleChangeEmail,
    password,
    handleChangePassword,
    step,
    handleNextStep,
    handlePrevStep,
    emailInvalidError,
    showPassword,
    handleShowPassword,
    passwordErrors,
    passwordInputBlur,
    onPasswordInputBlur,
    emailInputBlur,
    setEmailInputBlur,
  };
};
