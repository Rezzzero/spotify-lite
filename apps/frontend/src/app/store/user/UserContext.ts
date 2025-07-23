import { createContext } from "react";
import { UserData, UserToArtistSubs } from "@shared/types/user";

export type UserContextType = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  userImagePreview: string | null;
  setUserImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  artists: UserToArtistSubs[];
  setArtists: React.Dispatch<React.SetStateAction<UserToArtistSubs[]>>;
};

export const UserContext = createContext({} as UserContextType);
