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
  show_in_profile: boolean;
}
