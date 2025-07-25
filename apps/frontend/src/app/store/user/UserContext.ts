import { createContext } from "react";
import { UserData, UserToUserSubs } from "@shared/types/user";
import { Artist } from "@shared/types/types";

export type UserContextType = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  userImagePreview: string | null;
  setUserImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  userToArtistsSubs: (Artist & { added_at: string })[];
  setUserToArtistsSubs: React.Dispatch<
    React.SetStateAction<(Artist & { added_at: string })[]>
  >;
  userToUsersSubs: UserToUserSubs[];
  setUserToUsersSubs: React.Dispatch<React.SetStateAction<UserToUserSubs[]>>;
  subscribeUser: (subscribeData: {
    user_id: string;
    target_user_id: string;
  }) => Promise<void>;
  unsubscribeUser: (target_user_id: string) => Promise<void>;
};

export const UserContext = createContext({} as UserContextType);
