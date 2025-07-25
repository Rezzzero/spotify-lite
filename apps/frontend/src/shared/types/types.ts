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

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
  folowers?: {
    total: number;
  };
  images: Image[];
  genres?: string[];
}

export interface Playlist {
  id: string;
  name: string;
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

export interface Album {
  album_type: string;
  artists: Artist[];
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  total_tracks: number;
  type: string;
  tracks: {
    items: Track[];
    total: number;
  };
  label: string;
}

export interface ShortenedAlbumType {
  id: string;
  name: string;
  images: Image[];
}

export interface Track {
  album: Album;
  artists: Artist[];
  duration_ms: number;
  id: string;
  name: string;
  added_at?: string;
  entry_id?: string;
}

export interface TablesTrack {
  name: string;
  added_at?: string;
  id: string;
  duration_ms: number;
  entry_id?: string;
  album: ShortenedAlbumType;
  artists: {
    id: string;
    uri: string;
    href: string;
    name: string;
    type: string;
    external_urls: {
      spotify: string;
    };
  }[];
}

export interface Show {
  id: string;
  name: string;
  images: Image[];
  publisher: string;
  description: string;
}

export interface Episode {
  id: string;
  name: string;
  images: Image[];
  duration_ms: number;
  description: string;
  release_date: string;
}

export interface Release {
  name: string;
  images: Image[];
}

export interface SearchResults {
  albums: {
    items: Album[];
  };
  artists: {
    items: Artist[];
  };
  playlists: {
    items: Playlist[];
  };
  tracks: {
    items: Track[];
  };
  shows: {
    items: Show[];
  };
  episodes: {
    items: Episode[];
  };
}

export interface TrackToAdd {
  id: string;
  name: string;
  duration_ms: number;
  album: { id: string; name: string; images: Image[] };
  artists:
    | Artist[]
    | {
        id: string;
        uri: string;
        href: string;
        name: string;
        type: string;
        external_urls: {
          spotify: string;
        };
      }[];
  mp3_url: string;
}
