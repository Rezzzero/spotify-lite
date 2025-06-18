import { PlaylistData } from "@widgets/playlist-info/types/types";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaLibraryStore } from "src/app/store/media-library/useMediaLibraryStore";

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
  const { updatePlaylist, uploadPlaylistImage } = useMediaLibraryStore();

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

  const handleUpdatePlaylist = async () => {
    try {
      const updatedPlaylist = await updatePlaylist({
        id: id as string,
        name: playlistName as string,
        description: playlistDescription as string,
      });

      closeModal();
      if (updatedPlaylist) {
        setPlaylist({
          playlist: updatedPlaylist,
          playlistName: updatedPlaylist.name,
          playlistDescription: updatedPlaylist.description,
          imageUrl: updatedPlaylist.images[0].url || "",
        });
      }
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

  const handleUploadPlaylistImage = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await uploadPlaylistImage(id as string, formData);

      setPlaylist(
        (prev) =>
          ({
            ...prev,
            imageUrl: response,
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
    handleUpdatePlaylist,
    handleChangePlaylistName,
    handleChangePlaylistDescription,
    handleUploadPlaylistImage,
  };
};
