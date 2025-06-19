import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserSource } from "@shared/lib/source/getUserSource";
import axios from "axios";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { useUserStore } from "src/app/store/user/useUser";

interface UserInfo {
  id: string;
  userName: string;
  imageUrl: string;
}

export const useUserInfo = () => {
  const { user } = useUserStore();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [editModal, setEditModal] = useState(false);
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

  const isOwner = userInfo?.id === user?.user.id;

  return {
    userInfo,
    setUserInfo,
    loading,
    imageColors,
    editModal,
    setEditModal,
    isOwner,
  };
};
