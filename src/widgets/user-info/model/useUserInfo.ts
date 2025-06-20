import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserSource } from "@shared/lib/source/getUserSource";
import axios from "axios";
import { useGetColors } from "@shared/lib/hooks/useGetColors";
import { useUserStore } from "src/app/store/user/useUser";
import { API_URL } from "@shared/constants/constants";

interface UserInfo {
  id: string;
  userName: string;
  imageUrl: string;
}

export const useUserInfo = () => {
  const { user, setUser, setUserImagePreview, userImagePreview } =
    useUserStore();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const { imageColors } = useGetColors(userInfo?.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { id } = useParams();
  const source = getUserSource(id || "");
  const editModalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editModal &&
        editModalRef.current &&
        !editModalRef.current.contains(event.target as Node)
      ) {
        setEditModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editModal]);

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

  const handleUploadUserImage = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await axios.post(
        `${API_URL}/upload-user-image/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserImagePreview(previewImage);
      if (response.data.imageUrl && user) {
        setUser({
          ...user,
          user: {
            ...user?.user,
            user_metadata: {
              ...user?.user.user_metadata,
              userImage: response.data.imageUrl,
            },
          },
        });
      }
      setEditModal(false);
    } catch (error) {
      console.error("Error uploading user image:", error);
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSaveUserName = async () => {
    try {
      const response = await axios.post(`${API_URL}/update-user-name/${id}`, {
        userName,
      });
      const data = response.data.user.user_metadata.userName;
      if (data) {
        setUserInfo((prev) => (prev ? { ...prev, userName: data } : null));
      }
      setEditModal(false);
    } catch (error) {
      console.error("Error saving user name:", error);
    }
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
    imageFile,
    handleUploadUserImage,
    userImagePreview,
    userName,
    handleUserNameChange,
    handleSaveUserName,
  };
};
