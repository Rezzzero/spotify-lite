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
  type: string;
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
  };
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
}

export interface Track {
  album: Album;
  artists: Artist[];
  duration_ms: number;
  id: string;
  name: string;
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
}
