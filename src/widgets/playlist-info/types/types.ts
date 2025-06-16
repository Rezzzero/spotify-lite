import { Playlist } from "@shared/types/types";

export interface PlaylistData {
  playlist: Playlist & { duration: number };
  playlistName: string;
  playlistDescription: string;
  imageUrl: string;
}
