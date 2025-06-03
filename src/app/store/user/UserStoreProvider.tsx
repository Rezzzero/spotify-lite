import { useState, ReactNode } from "react";
import { UserContext } from "./UserContext";
import { UserData } from "@shared/types/user";

export const UserStoreProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({} as UserData);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
