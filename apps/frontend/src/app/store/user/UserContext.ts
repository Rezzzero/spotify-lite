import { createContext } from "react";
import { UserData, UserToArtistSubs } from "@shared/types/user";

export type UserContextType = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  userImagePreview: string | null;
  setUserImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  userToArtistsSubs: UserToArtistSubs[];
  setUserToArtistsSubs: React.Dispatch<
    React.SetStateAction<UserToArtistSubs[]>
  >;
  userToUsersSubs: {
    id: string;
    name: string;
    avatar_url: string;
  }[];
  setUserToUsersSubs: React.Dispatch<
    React.SetStateAction<{ id: string; name: string; avatar_url: string }[]>
  >;
  subscribeUser: (subscribeData: {
    user_id: string;
    target_user_id: string;
  }) => Promise<void>;
  unsubscribeUser: (target_user_id: string) => Promise<void>;
};

export const UserContext = createContext({} as UserContextType);
