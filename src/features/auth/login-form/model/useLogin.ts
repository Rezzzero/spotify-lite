import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../../app/store/user/useUser";
import { useForm } from "react-hook-form";
import { maskEmail } from "@shared/lib/mask/maskEmail";

type FormValues = {
  email: string;
  password: string;
  otp: string[];
};

type SignInKey = keyof FormValues;

export const useLogin = () => {
  const {
    register,
    trigger,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>();
  const [coveredEmail, setCoveredEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [otpError, setOtpError] = useState({ status: false, message: "" });
  const [verifyStep, setVerifyStep] = useState<boolean>(false);
  const [withPassword, setWithPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [signInError, setSignInError] = useState({
    status: false,
    message: "",
  });
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const emailValue = watch("email", "");
  const passwordValue = watch("password", "");
  const withPasswordRef = useRef(false);

  useEffect(() => {
    withPasswordRef.current = withPassword;
  }, [withPassword]);

  const createOnChange = (field: SignInKey) => () => {
    trigger(field);
  };

  const handleChangeOtp = (index: number, value: string) => {
    setOtpError({ status: false, message: "" });
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    setOtpError({ status: false, message: "" });
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    setOtpError({ status: false, message: "" });
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = otp.map((_, i) => pasted[i] || "");
    setOtp(newOtp);
    inputRefs.current[pasted.length - 1]?.focus();
    verifyOtp(newOtp.join(""));
  };

  const sendOtp = async () => {
    trigger("email");

    setVerifyStep(true);
    setWithPassword(false);
    setCoveredEmail(maskEmail(emailValue));

    setTimeout(async () => {
      if (withPasswordRef.current) {
        return;
      }

      try {
        const res = await axios.post("http://localhost:3000/auth/send-otp", {
          email: emailValue,
        });
        console.log(res);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.error ||
            "Что-то пошло не так. Попробуйте позже.";
          setError("email", { message });
        }
      }
    }, 30000);
  };

  const verifyOtp = async (newOtp: string) => {
    setLoading(true);

    if (newOtp.length < 1) {
      setOtpError({
        status: true,
        message: "Это поле нельзя оставлять пустым",
      });
      setLoading(false);
      return;
    }
    if (newOtp.length < 6) {
      setOtpError({
        status: true,
        message: "Код слишком короткий",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/verify-otp",
        {
          email: emailValue,
          otp: newOtp,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);

      setUser(res.data.session);

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          "Что-то пошло не так. Попробуйте позже.";
        setOtpError({
          status: true,
          message,
        });
        setLoading(false);
      }
    }
  };

  const signInWithPassword = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/signin",
        {
          email: emailValue,
          password: passwordValue,
        },
        {
          withCredentials: true,
        }
      );

      setLoading(false);
      setSignInError({ status: false, message: "" });

      setUser(res.data.session);

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          "Что-то пошло не так. Попробуйте позже.";
        setSignInError({
          status: true,
          message,
        });
        setLoading(false);
      }
    }
  };

  return {
    register,
    errors,
    createOnChange,
    otp,
    inputRefs,
    handleChangeOtp,
    handleOtpKeyDown,
    handleOtpPaste,
    sendOtp,
    verifyStep,
    verifyOtp,
    setVerifyStep,
    loading,
    withPassword,
    setWithPassword,
    showPassword,
    handleShowPassword,
    signInWithPassword,
    coveredEmail,
    otpError,
    signInError,
  };
};
