import { useState } from "react";
import { useForm } from "react-hook-form";
import { initialUserInfoBlur } from "./state/InitialStates";
import { UserInfoKey } from "./types/NewUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Route } from "../../../../shared/constants/constants";

export type FormValues = {
  email: string;
  password: string;
  userName: string;
  birthday: number;
  monthOfBirthday: number;
  yearOfBirthday: number;
  gender: string;
  termsOfUse: boolean;
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
    control,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      termsOfUse: false,
    },
  });
  const [adsDisabled, setAdsDisabled] = useState(false);
  const [shareData, setShareData] = useState(false);
  const [emailExists, setEmailExists] = useState<{
    status: boolean;
    email: string;
  }>({ status: false, email: "" });
  const navigate = useNavigate();

  const emailValue = watch("email", "");
  const passwordValue = watch("password", "");
  const userNameValue = watch("userName", "");
  const currentGender = watch("gender", "");
  const birthdayValue = watch("birthday", 0);
  const monthOfBirthdayValue = watch("monthOfBirthday", 0);
  const yearOfBirthdayValue = watch("yearOfBirthday", 0);
  const termsOfUseValue = watch("termsOfUse", false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const createOnChange = (field: UserInfoKey) => () => {
    if (userInfoBlur[field]) {
      if (field === "email") {
        setEmailExists((prev) => ({ ...prev, status: false }));
      }
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
      try {
        const response = await axios.get("http://localhost:3000/check-email", {
          params: { email: emailValue },
        });

        if (response.data && response.data.exists) {
          setEmailExists({ status: true, email: emailValue });
          return;
        }
      } catch (error) {
        console.error("Ошибка проверки email", error);
        return;
      }

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
    if (step === 2) {
      const isValid = await trigger([
        "userName",
        "birthday",
        "monthOfBirthday",
        "yearOfBirthday",
        "gender",
      ]);

      if (isValid) {
        clearErrors([
          "userName",
          "birthday",
          "monthOfBirthday",
          "yearOfBirthday",
          "gender",
        ]);
        setStep(3);
      } else {
        setStep(2);
      }
    }
    if (step === 3) {
      const isValid = await trigger("termsOfUse");

      if (!isValid) {
        console.log("Terms of use not accepted", termsOfUseValue);
        setStep(3);
        return;
      }

      clearErrors("termsOfUse");

      try {
        const response = await axios.post("http://localhost:3000/signup", {
          email: emailValue,
          password: passwordValue,
          userName: userNameValue,
          birthday: birthdayValue,
          monthOfBirthday: monthOfBirthdayValue,
          yearOfBirthday: yearOfBirthdayValue,
          gender: currentGender,
        });
        console.log(response.data);
        navigate(Route.HOME);
      } catch (error) {
        console.error("Ошибка регистрации:", error);
      }
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
    if (step === 1) {
      clearErrors("password");
      setUserInfoBlur({ ...userInfoBlur, password: false });
    }
    if (step === 2) {
      clearErrors([
        "userName",
        "birthday",
        "monthOfBirthday",
        "yearOfBirthday",
        "gender",
      ]);

      setUserInfoBlur({ ...userInfoBlur, userName: false });
      setUserInfoBlur({ ...userInfoBlur, birthday: false });
      setUserInfoBlur({ ...userInfoBlur, monthOfBirthday: false });
      setUserInfoBlur({ ...userInfoBlur, yearOfBirthday: false });
      setUserInfoBlur({ ...userInfoBlur, gender: false });
    }
    if (step === 3) {
      clearErrors("termsOfUse");
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
    birthdayValue,
    monthOfBirthdayValue,
    yearOfBirthdayValue,
    adsDisabled,
    setAdsDisabled,
    shareData,
    setShareData,
    control,
    emailValue,
    emailExists,
  };
};
