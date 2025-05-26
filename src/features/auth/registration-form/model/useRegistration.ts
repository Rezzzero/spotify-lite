import { useState } from "react";
import { isValidEmail } from "../../../../shared/lib/validators/IsValidEmail";

export const useRegistration = () => {
  const [emailError, setEmailError] = useState<{
    status: boolean;
    message: string;
  }>({ status: false, message: "" });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNextStep = () => {
    if (step === 0) {
      if (!isValidEmail(email)) {
        setEmailError({
          status: true,
          message:
            "Адрес электронной почты недействителен. Убедитесь, что он указан в таком формате: example@email.com.",
        });
      } else {
        setStep(1);
      }
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  return {
    email,
    handleChangeEmail,
    password,
    handleChangePassword,
    step,
    handleNextStep,
    handlePrevStep,
    emailError,
    showPassword,
    handleShowPassword,
  };
};
