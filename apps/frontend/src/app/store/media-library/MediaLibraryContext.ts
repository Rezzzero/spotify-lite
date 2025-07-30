import { createContext } from "react";
import { SupabaseAlbum, SupabasePlaylist } from "@shared/types/mediaLibrary";
import { UserToArtistSubs } from "@shared/types/user";

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
  removePlaylistFromUser: (playlistId: string) => Promise<void>;
  addPlaylistToUser: (playlistId: string) => Promise<void>;
  subscribeArtist: (artistData: UserToArtistSubs) => Promise<void>;
  unsubscribeArtist: (artistId: string) => Promise<void>;
  albums: SupabaseAlbum[];
  addAlbum: (albumData: SupabaseAlbum) => Promise<void>;
  removeAlbum: (albumId: string) => Promise<void>;
}

export const MediaLibraryContext = createContext({} as MediaLibraryContextType);
