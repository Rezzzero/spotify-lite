import { Image } from "./types";

export interface SupabasePlaylist {
  id: string;
  name: string;
  user_id: string;
  description: string;
  public: boolean;
  images: {
    url: string;
  }[];
  owner?: {
    id?: string;
    display_name?: string;
    imageUrl?: string;
  };
  duration?: number;
  added_at?: string;
  show_in_profile: boolean;
  type?: string;
}

export interface SupabaseAlbum {
  id: string;
  name: string;
  images: Image[];
  owner: {
    name: string;
  };
}
