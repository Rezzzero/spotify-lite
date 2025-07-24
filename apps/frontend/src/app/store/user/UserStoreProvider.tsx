import { useState, ReactNode, useEffect } from "react";
import { UserContext } from "./UserContext";
import { UserData, UserToArtistSubs } from "@shared/types/user";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";

export const UserStoreProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userToArtistsSubs, setUserToArtistsSubs] = useState<
    UserToArtistSubs[]
  >([]);
  const [userToUsersSubs, setUserToUsersSubs] = useState<
    { id: string; name: string; avatar_url: string }[]
  >([]);
  const [userImagePreview, setUserImagePreview] = useState<string | null>(null);
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
      console.log("subscribeUser", response.data);
      setUserToUsersSubs([...userToUsersSubs, response.data[0]]);
    } catch {
      setUser(null);
    }
  };

  const unsubscribeUser = async (target_user_id: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/unsubscribe-user/${target_user_id}`,
        { userId: user?.user.id }
      );
      console.log("unsubscribeUser", response.data);
      setUserToUsersSubs(
        userToUsersSubs.filter((user) => user.id !== response.data.id)
      );
    } catch {
      setUser(null);
    }
  };
  console.log(userToUsersSubs);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
