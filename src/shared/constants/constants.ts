export const Route = {
  HOME: "/",
  SEARCH: "/search/:value?",
  SEARCH_EMPTY: "/search",
  ALBUM: "/album/:albumId",
  ARTIST: "/artist/:artistId",
};

export const MediaLibraryLinks = [
  {
    name: "Юридическая информация",
    path: "#",
  },
  {
    name: "Цент безопасности и конфиденциальности",
    path: "#",
  },
  {
    name: "Политика конфиденциальности",
    path: "#",
  },
  {
    name: "Файлы cookie",
    path: "#",
  },
  {
    name: "О рекламе",
    path: "#",
  },
  {
    name: "Специальные возможности",
    path: "#",
  },
];

export const FiltersList = {
  ALL: "Все",
  TRACKS: "Треки",
  ARTISTS: "Исполнители",
  PLAYLISTS: "Плейлисты",
  ALBUMS: "Альбомы",
  PODCASTS: "Подкасты и шоу",
  GENRES: "Жанры и настроения",
  PROFILES: "Профили",
} as {
  [key: string]: string;
};
