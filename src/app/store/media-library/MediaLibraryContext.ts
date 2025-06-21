import { createContext } from "react";
import { SupabasePlaylist } from "@shared/types/playlist";

interface MediaLibraryContextType {
  playlists: SupabasePlaylist[];
  addPlaylist: (playlistData: SupabasePlaylist) => Promise<void>;
  removePlaylist: (playlistId: string) => void;
  updatePlaylist: (playlist: {
    id: string;
    name: string;
    description: string;
  }) => Promise<SupabasePlaylist | undefined>;
  uploadPlaylistImage: (
    id: string,
    formData: FormData,
    previewImage: string
  ) => Promise<string>;
  changePublicStatus: (
    id: string,
    isPublic: boolean
  ) => Promise<SupabasePlaylist | undefined>;
  playlistPreviewImages: { id: string; previewImage: string }[];
  setPlaylistPreviewImages: (
    playlistPreviewImages: { id: string; previewImage: string }[]
  ) => void;
  deletePlaylistImage: (id: string) => Promise<void>;
}

export const MediaLibraryContext = createContext({} as MediaLibraryContextType);
