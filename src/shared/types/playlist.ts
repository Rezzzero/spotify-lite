export interface SupabasePlaylist {
  id: string;
  name: string;
  userId: string;
  description: string;
  public: boolean;
  images: {
    url: string;
  }[];
  owner: {
    id: string;
    display_name: string;
    imageUrl: string;
  };
  duration?: number;
}
