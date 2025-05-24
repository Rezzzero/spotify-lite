import { useState } from "react";

export const useRegistration = () => {
  const [email, setEmail] = useState<string>("");
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
  
    return { email, handleChange };
};
