import { useState } from "react";
import { useForm } from "react-hook-form";
import { initialUserInfoBlur } from "./state/InitialStates";
import { UserInfoKey } from "./types/NewUser";

export type FormValues = {
  email: string;
  password: string;
  userName: string;
  birthday: number;
  monthOfBirthday: number;
  yearOfBirthday: number;
  gender: string;
};

export const useRegistrationForm = () => {
  const [step, setStep] = useState(0);
  const [userInfoBlur, setUserInfoBlur] = useState(initialUserInfoBlur);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    trigger,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  const passwordValue = watch("password", "");

  const currentGender = watch("gender", "");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const createOnChange = (field: UserInfoKey) => () => {
    if (userInfoBlur[field]) {
      trigger(field);
    }
  };

  const createOnBlur = (field: UserInfoKey) => async () => {
    setUserInfoBlur((prev) => ({ ...prev, [field]: true }));

    await trigger(field);
  };

  const handleGenderSelect = (value: string) => {
    setValue("gender", value, { shouldValidate: true });
    trigger("gender");
  };

  const handleNextStep = async () => {
    if (step === 0) {
      const isValid = await trigger("email");

      if (isValid) {
        clearErrors("email");
        setStep(1);
      } else {
        setStep(0);
      }
    }
    if (step === 1) {
      const isValid = await trigger("password");

      if (isValid) {
        clearErrors("password");
        setStep(2);
      } else {
        setStep(1);
      }
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
    if (step === 1) {
      clearErrors("password");
      setUserInfoBlur({ ...userInfoBlur, password: false });
    }
  };

  return {
    step,
    setStep,
    register,
    createOnChange,
    createOnBlur,
    handleNextStep,
    handlePrevStep,
    showPassword,
    handleShowPassword,
    handleGenderSelect,
    errors,
    passwordValue,
    userInfoBlur,
    currentGender,
  };
};
