import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";
import { PlaylistData } from "@widgets/playlist-info/types/types";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";
import { useClickOutside } from "@shared/lib/hooks/useClickOutside";

export const useEditPlaylist = ({
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [subModal, setSubModal] = useState(false);
  const subModalRef = useRef<HTMLDivElement>(null);
  const subModalButtonRef = useRef<HTMLButtonElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    updatePlaylist,
    uploadPlaylistImage,
    deletePlaylistImage,
    playlistPreviewImages,
  } = useMediaLibraryStore();
  useClickOutside({
    refs: [subModalRef, subModalButtonRef],
    handler: () => setSubModal(false),
    enabled: subModal,
  });

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

  const handleSavePlaylist = async () => {
    try {
      const updatedPlaylist = await updatePlaylist({
        id: id as string,
        name: playlistName as string,
        description: playlistDescription as string,
      });

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await uploadPlaylistImage(
          id as string,
          formData,
          previewImage as string
        );

        setPlaylist(
          (prev) =>
            ({
              ...prev,
              imageUrl: response,
            } as PlaylistData)
        );
      } else if (previewImage === PLAYLIST_PLACEHOLDER_URL) {
        await deletePlaylistImage(id as string);
      }

      if (updatedPlaylist) {
        setPlaylist(
          (prev) =>
            ({
              ...prev,
              playlist: updatedPlaylist,
              playlistName: updatedPlaylist.name,
              playlistDescription: updatedPlaylist.description,
            } as PlaylistData)
        );
      }

      closeModal();
    } catch (error) {
      console.error("Error saving playlist:", error);
    }
  };

  const handleSelectImage = () => {
    setSubModal(false);
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

  const handleDeletePlaylistPreviewImage = () => {
    setPreviewImage(PLAYLIST_PLACEHOLDER_URL);
  };

  return {
    handleSelectImage,
    handleImageChange,
    fileInputRef,
    handleSavePlaylist,
    handleChangePlaylistName,
    handleChangePlaylistDescription,
    previewImage,
    playlistPreviewImages,
    playlistId: id as string,
    subModal,
    setSubModal,
    subModalRef,
    subModalButtonRef,
    handleDeletePlaylistPreviewImage,
  };
};
