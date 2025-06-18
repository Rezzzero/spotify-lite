import { createContext } from "react";
import { SupabasePlaylist } from "@shared/types/playlist";

interface MediaLibraryContextType {
  playlists: SupabasePlaylist[];
  fetchPlaylists: (userId: string) => Promise<void>;
  addPlaylist: (playlistData: SupabasePlaylist) => Promise<void>;
  removePlaylist: (playlistId: string) => void;
  updatePlaylist: (playlist: {
    id: string;
    name: string;
    description: string;
  }) => Promise<SupabasePlaylist | undefined>;
  uploadPlaylistImage: (id: string, formData: FormData) => Promise<string>;
  changePublicStatus: (
    id: string,
    isPublic: boolean
  ) => Promise<SupabasePlaylist | undefined>;
}

export const MediaLibraryContext = createContext({} as MediaLibraryContextType);
