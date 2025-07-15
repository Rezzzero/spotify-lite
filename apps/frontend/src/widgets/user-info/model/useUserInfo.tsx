import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserSource } from "@shared/lib/source/getUserSource";
import axios from "axios";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { useUserStore } from "@app/store/user/useUser";
import { API_URL } from "@shared/constants/constants";
import { USER_PLACEHOLDER_URL } from "@shared/constants/urls";
import { toast } from "react-toastify";
import { SupabasePlaylist } from "@shared/types/playlist";
import { Playlist } from "@shared/types/types";
import { useClickOutside } from "@shared/lib/hooks/useClickOutside";

interface UserInfo {
  id: string;
  userName: string;
  imageUrl: string;
  openedPlaylists:
    | SupabasePlaylist[]
    | (Playlist & { duration: number })[]
    | null;
}

export const useUserInfo = () => {
  const { user, setUser, setUserImagePreview, userImagePreview } =
    useUserStore();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const { imageColors } = useGetColors(userInfo?.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { id } = useParams();
  const source = getUserSource(id || "");
  const editModalRef = useRef<HTMLDivElement>(null);
  const menuModalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useClickOutside({
    refs: [editModalRef],
    handler: () => setEditModal(false),
    enabled: editModal,
  });
  useClickOutside({
    refs: [menuModalRef],
    handler: () => setMenuModal(false),
    enabled: menuModal,
  });

  useEffect(() => {
    setLoading(true);
    let endpoint = "";
    if (source === "supabase") {
      endpoint = `${API_URL}/get-user-by-id/${id}`;
    } else {
      endpoint = `${API_URL}/get-spotify-user-by-id/${id}`;
    }
    const fetchUserInfo = async () => {
      const response = await axios.get(endpoint);
      setUserInfo(response.data);
      setUserName(response.data.userName);
      setLoading(false);
    };
    fetchUserInfo();
  }, [id, source]);

  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleDeletePreviewImage = () => {
    setPreviewImage(USER_PLACEHOLDER_URL);
  };

  const handleSaveProfile = async () => {
    try {
      if (userName.trim() !== userInfo?.userName) {
        const nameResponse = await axios.post(
          `${API_URL}/update-user-name/${id}`,
          {
            userName,
          }
        );
        const data = nameResponse.data.user.user_metadata.userName;
        if (data) {
          setUserInfo((prev) => (prev ? { ...prev, userName: data } : null));
        }
      }

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const imageResponse = await axios.post(
          `${API_URL}/upload-user-image/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUserImagePreview(previewImage);
        if (imageResponse.data.imageUrl && user) {
          setUser({
            ...user,
            user: {
              ...user?.user,
              user_metadata: {
                ...user?.user.user_metadata,
                userImage: imageResponse.data.imageUrl,
              },
            },
          });
        }
      } else if (
        previewImage === USER_PLACEHOLDER_URL &&
        userInfo?.imageUrl !== USER_PLACEHOLDER_URL
      ) {
        const deleteResponse = await axios.delete(
          `${API_URL}/delete-user-image/${id}`
        );
        if (deleteResponse.data.message) {
          setUserImagePreview(USER_PLACEHOLDER_URL);
          setUserInfo((prev) =>
            prev ? { ...prev, imageUrl: USER_PLACEHOLDER_URL } : null
          );
        }
      }

      setEditModal(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/user/${userInfo?.id}`
    );
    setMenuModal(false);
    toast(<p>Ссылка скопирована в буфер обмена</p>, {
      style: { width: "310px" },
    });
  };

  const isOwner = userInfo?.id === user?.user.id;

  return {
    userInfo,
    setUserInfo,
    loading,
    imageColors,
    editModal,
    setEditModal,
    isOwner,
    editModalRef,
    fileInputRef,
    previewImage,
    handleImageChange,
    handleSelectImage,
    userImagePreview,
    userName,
    handleUserNameChange,
    handleDeletePreviewImage,
    handleSaveProfile,
    menuModal,
    setMenuModal,
    menuModalRef,
    handleCopyLink,
  };
};
