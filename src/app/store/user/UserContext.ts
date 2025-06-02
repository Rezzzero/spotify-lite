import { createContext } from "react";
import { UserData } from "../../../shared/types/user";

export type UserContextType = {
  user: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
};

export const UserContext = createContext({} as UserContextType);
