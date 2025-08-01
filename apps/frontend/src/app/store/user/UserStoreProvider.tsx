import { useState, ReactNode, useEffect } from "react";
import { UserContext } from "./UserContext";
import { UserData, UserToUserSubs } from "@shared/types/user";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";
import { Artist, Playlist } from "@shared/types/types";
import { SupabasePlaylist } from "@shared/types/mediaLibrary";

export const UserStoreProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userToArtistsSubs, setUserToArtistsSubs] = useState<
    (Artist & { added_at: string })[]
  >([]);
  const [userToUsersSubs, setUserToUsersSubs] = useState<UserToUserSubs[]>([]);
  const [userImagePreview, setUserImagePreview] = useState<string | null>(null);
  const [userStoredFollowers, setUserStoredFollowers] = useState<
    { id: string; name: string; avatar_url: string }[]
  >([]);
  const [userStoredOpenPlaylists, setUserStoredOpenPlaylists] = useState<
    SupabasePlaylist[] | (Playlist & { duration: number })[] | null
  >([]);
  useEffect(() => {
    const initialUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          withCredentials: true,
        });
        setUser(response.data);
        setUserToArtistsSubs(response.data.subscriptions.userToArtistSubs);
        setUserToUsersSubs(response.data.subscriptions.userToUserSubs);
      } catch {
        setUser(null);
      }
    };

    initialUser();
  }, []);

  const subscribeUser = async (subscribeData: {
    user_id: string;
    target_user_id: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_URL}/subscribe-user`,
        subscribeData
      );

      setUserToUsersSubs([...userToUsersSubs, response.data[0]]);
    } catch {
      setUser(null);
    }
  };

  const unsubscribeUser = async (target_user_id: string) => {
    try {
      await axios.post(`${API_URL}/unsubscribe-user/${target_user_id}`, {
        userId: user?.user.id,
      });
      setUserToUsersSubs(
        userToUsersSubs.filter((user) => user.id !== target_user_id)
      );
    } catch {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userImagePreview,
        setUserImagePreview,
        userToArtistsSubs,
        setUserToArtistsSubs,
        userToUsersSubs,
        setUserToUsersSubs,
        subscribeUser,
        unsubscribeUser,
        userStoredFollowers,
        setUserStoredFollowers,
        userStoredOpenPlaylists,
        setUserStoredOpenPlaylists,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
