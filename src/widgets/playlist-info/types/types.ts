import { SupabasePlaylist } from "@shared/types/playlist";
import { Playlist } from "@shared/types/types";

export interface PlaylistData {
  playlist: (Playlist & { duration: number }) | SupabasePlaylist;
  playlistName: string;
  playlistDescription: string;
  imageUrl: string;
}
