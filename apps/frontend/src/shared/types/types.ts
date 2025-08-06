export interface CardItem {
  name: string;
  images: Image[];
  artists?: Artist[];
  release_date?: string;
  owner?: {
    display_name: string;
  };
  publisher?: string;
  duration_ms?: number;
  id?: string;
}

export interface SpotifyResource {
  uri: string;
  href: string;
  external_urls: {
    spotify: string;
  };
}

export type SpotifyItemType =
  | "artist"
  | "track"
  | "album"
  | "playlist"
  | "show"
  | "episode";

export interface MediaItem {
  id: string;
  name: string;
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Artist extends MediaItem, SpotifyResource {
  type: SpotifyItemType;
  folowers?: {
    total: number;
  };
  images: Image[];
  genres?: string[];
}

export interface Playlist extends MediaItem {
  images: Image[];
  description: string;
  owner: {
    display_name: string;
    id: string;
    imageUrl?: string;
  };
  public: boolean;
  user_id?: string;
  show_in_profile: boolean;
}

export interface Album extends MediaItem {
  album_type: string;
  artists: Artist[];
  images: Image[];
  release_date: string;
  total_tracks: number;
  type: SpotifyItemType;
  tracks: {
    items: Track[];
    total: number;
  };
  label: string;
}

export interface ShortenedAlbumType extends MediaItem {
  images: Image[];
}

export interface SimplifiedArtist extends SpotifyResource, MediaItem {
  type: "artist";
}

export interface Track extends MediaItem {
  album: Album;
  artists: Artist[];
  duration_ms: number;
  added_at?: string;
  entry_id?: string;
}

export interface TablesTrack extends MediaItem {
  added_at?: string;
  duration_ms: number;
  entry_id?: string;
  album: ShortenedAlbumType;
  artists: SimplifiedArtist[];
}

export interface Show extends MediaItem {
  images: Image[];
  publisher: string;
  description: string;
}

export interface Episode extends MediaItem {
  images: Image[];
  duration_ms: number;
  description: string;
  release_date: string;
}

export interface Release {
  name: string;
  images: Image[];
}

export interface SearchCategory<T> {
  items: T[];
}

export interface SearchResults {
  albums: SearchCategory<Album>;
  artists: SearchCategory<Artist>;
  playlists: SearchCategory<Playlist>;
  tracks: SearchCategory<Track>;
  shows: SearchCategory<Show>;
  episodes: SearchCategory<Episode>;
}

export interface TrackToAdd extends MediaItem {
  duration_ms: number;
  album: { id: string; name: string; images: Image[] };
  artists: Artist[] | SimplifiedArtist[];
  mp3_url: string;
}
