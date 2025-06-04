import { createContext } from "react";
import { UserData } from "@shared/types/user";

export type UserContextType = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

export const UserContext = createContext({} as UserContextType);
