import { PlaylistData } from "@widgets/playlist-info/types/types";
import axios from "axios";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const useEditPlaylistModal = ({
  closeModal,
  playlistName,
  playlistDescription,
  setPlaylist,
}: {
  closeModal: () => void;
  playlistName: string | undefined;
  playlistDescription: string | undefined;
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistData | null>>;
}) => {
  const { id } = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangePlaylistName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylist(
      (prev) => ({ ...prev, playlistName: e.target.value } as PlaylistData)
    );
  };

  const handleChangePlaylistDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPlaylist(
      (prev) =>
        ({ ...prev, playlistDescription: e.target.value } as PlaylistData)
    );
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
      setPlaylist({
        playlist: response.data[0],
        playlistName: response.data[0].name,
        playlistDescription: response.data[0].description,
        imageUrl: response.data[0].image_url || "",
      });
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

      setPlaylist(
        (prev) =>
          ({
            ...prev,
            imageUrl: response.data[0].image_url,
          } as PlaylistData)
      );
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
