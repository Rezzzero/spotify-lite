import { Playlist } from "@shared/types/types";
import axios from "axios";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const useEditPlaylistModal = ({
  closeModal,
  playlistName,
  playlistDescription,
  setPlaylist,
  setPlaylistName,
  setPlaylistDescription,
  setImageUrl,
}: {
  closeModal: () => void;
  playlistName: string;
  playlistDescription: string;
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>;
  setPlaylistName: React.Dispatch<React.SetStateAction<string>>;
  setPlaylistDescription: React.Dispatch<React.SetStateAction<string>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { id } = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangePlaylistName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(e.target.value);
  };

  const handleChangePlaylistDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPlaylistDescription(e.target.value);
  };

  const handleUpatePlaylist = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/update-supabase-playlist/${id}`,
        {
          name: playlistName,
          description: playlistDescription,
        }
      );

      closeModal();
      setPlaylist(response.data[0]);
      setPlaylistName(response.data[0].name);
      setPlaylistDescription(response.data[0].description);
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      console.log(imageFile);
    }
  };

  const uploadPlaylistImage = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await axios.post(
        `http://localhost:3000/upload-playlist-image/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPlaylist(response.data[0]);
      setImageUrl(response.data[0].images[0].url);
    } catch (error) {
      console.error("Error uploading playlist image:", error);
    }
  };

  return {
    handleSelectImage,
    handleImageChange,
    fileInputRef,
    handleUpatePlaylist,
    handleChangePlaylistName,
    handleChangePlaylistDescription,
    uploadPlaylistImage,
  };
};
