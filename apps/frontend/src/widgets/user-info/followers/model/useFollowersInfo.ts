import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useUserStore } from "@app/store/user/useUser";
import { API_URL } from "@shared/constants/constants";
export const useFollowersInfo = () => {
  const { userStoredFollowers, setUserStoredFollowers } = useUserStore();
  const [userFollowers, setUserFollowers] = useState(userStoredFollowers);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get(`${API_URL}/get-user-followers/${id}`);
      setUserFollowers(response.data);
      setUserStoredFollowers(response.data);
    };
    fetchUserInfo();
  }, [id]);

  return { userFollowers };
};
