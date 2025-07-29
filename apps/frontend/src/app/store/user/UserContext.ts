import { createContext } from "react";
import { UserData, UserToUserSubs } from "@shared/types/user";
import { Artist, Playlist } from "@shared/types/types";
import { SupabasePlaylist } from "@shared/types/mediaLibrary";

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
  userStoredFollowers: { id: string; name: string; avatar_url: string }[];
  setUserStoredFollowers: React.Dispatch<
    React.SetStateAction<{ id: string; name: string; avatar_url: string }[]>
  >;
  userStoredOpenPlaylists:
    | SupabasePlaylist[]
    | (Playlist & { duration: number })[]
    | null;
  setUserStoredOpenPlaylists: React.Dispatch<
    React.SetStateAction<
      SupabasePlaylist[] | (Playlist & { duration: number })[] | null
    >
  >;
};

export const UserContext = createContext({} as UserContextType);
