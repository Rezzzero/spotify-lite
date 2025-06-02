import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../../app/store/user/useUSer";

export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [coveredEmail, setCoveredEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [verifyStep, setVerifyStep] = useState<boolean>(false);
  const [withPassword, setWithPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeOtp = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = otp.map((_, i) => pasted[i] || "");
    setOtp(newOtp);
    inputRefs.current[pasted.length - 1]?.focus();
    verifyOtp();
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/send-otp", {
        email,
      });

      setCoveredEmail(res.data.coveredEmail);
      setVerifyStep(true);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          "Что-то пошло не так. Попробуйте позже.";
        alert(message);
        setLoading(false);
      }
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/verify-otp", {
        email,
        otp: otp.join(""),
      });
      setLoading(false);

      setUser(res.data);

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          "Что-то пошло не так. Попробуйте позже.";
        alert(message);
        setLoading(false);
      }
    }
  };

  const signInWithPassword = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/signin", {
        email,
        password,
      });

      setLoading(false);

      setUser(res.data);

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          "Что-то пошло не так. Попробуйте позже.";
        alert(message);
        setLoading(false);
      }
    }
  };

  return {
    email,
    handleChangeEmail,
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
    password,
    handleChangePassword,
    showPassword,
    handleShowPassword,
    signInWithPassword,
    coveredEmail,
  };
};
