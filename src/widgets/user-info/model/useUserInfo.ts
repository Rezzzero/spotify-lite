import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserSource } from "@shared/lib/source/getUserSource";
import axios from "axios";
import { useGetColors } from "@shared/lib/hooks/useGetColors";

interface UserInfo {
  id: string;
  userName: string;
  imageUrl: string;
}

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { imageColors } = useGetColors(userInfo?.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const source = getUserSource(id || "");

  useEffect(() => {
    setLoading(true);
    let endpoint = "";
    if (source === "supabase") {
      endpoint = `http://localhost:3000/get-user-by-id/${id}`;
    } else {
      endpoint = `http://localhost:3000/get-spotify-user-by-id/${id}`;
    }
    const fetchUserInfo = async () => {
      const response = await axios.get(endpoint);

      setUserInfo(response.data);
      setLoading(false);
    };
    fetchUserInfo();
  }, [id, source]);

  return { userInfo, setUserInfo, loading, imageColors };
};
