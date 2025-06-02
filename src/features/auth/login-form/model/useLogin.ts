import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../../app/store/user/useUSer";

export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
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

  const handleChangeOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/send-otp", {
        email,
      });

      console.log(res.data);

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
        otp,
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
    handleChangeOtp,
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
  };
};
