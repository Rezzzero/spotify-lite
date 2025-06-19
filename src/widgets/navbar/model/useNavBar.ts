import { useLocation } from "react-router-dom";
import { useUserStore } from "src/app/store/user/useUser";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";

export const useNavbar = () => {
  const { user } = useUserStore();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await axios.post(`${API_URL}/signout`, null, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return { user, location, handleSignOut };
};
