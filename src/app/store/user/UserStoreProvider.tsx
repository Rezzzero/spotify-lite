import { useState, ReactNode, useEffect } from "react";
import { UserContext } from "./UserContext";
import { UserData } from "@shared/types/user";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";

export const UserStoreProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userImagePreview, setUserImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const initialUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          withCredentials: true,
        });

        setUser(response.data);
      } catch {
        setUser(null);
      }
    };

    initialUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, userImagePreview, setUserImagePreview }}
    >
      {children}
    </UserContext.Provider>
  );
};
