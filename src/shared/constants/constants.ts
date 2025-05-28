import { Album } from "../types/types";

export const Route = {
  HOME: "/",
  SEARCH: "/search/:value?",
  SEARCH_EMPTY: "/search",
  SEARCH_BY_CATEGORY: "/search/:value/:category",
  SECTION: "/section/:name",
  ALBUM: "/album/:id",
  ARTIST: "/artist/:id",
  TRACK: "/track/:id",
  DISCOGRAPHY: "/artist/:id/discography/:filter",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  TEST: "/test",
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

export const CategoriesList = {
  ALL: {
    name: "Все",
    path: "",
  },
  TRACKS: {
    name: "Треки",
    path: "tracks",
  },
  ARTISTS: {
    name: "Исполнители",
    path: "artists",
  },
  PLAYLISTS: {
    name: "Плейлисты",
    path: "playlists",
  },
  ALBUMS: {
    name: "Альбомы",
    path: "albums",
  },
  PODCASTS: {
    name: "Подкасты",
    path: "shows",
  },
} as {
  [key: string]: { name: string; path: string };
};

export const FooterLinks = {
  Company: {
    name: "Компания",
    links: [
      {
        name: "О нас",
        path: "#",
      },
      {
        name: "Вакансии",
        path: "#",
      },
      {
        name: "For the Record",
        path: "#",
      },
    ],
  },
  Communities: {
    name: "Сообщества",
    links: [
      {
        name: "Для исполнителей",
        path: "#",
      },
      {
        name: "Для разработчиков",
        path: "#",
      },
      {
        name: "Реклама",
        path: "#",
      },
      {
        name: "Для инвесторов",
        path: "#",
      },
      {
        name: "Для вендоров",
        path: "#",
      },
    ],
  },
  UsefullLinks: {
    name: "Полезные ссылки",
    links: [
      {
        name: "Справка",
        path: "#",
      },
      {
        name: "Бесплатное мобильное приложение",
        path: "#",
      },
    ],
  },
  SpotifyLitePlans: {
    name: "Планы Spotify Lite",
    links: [
      {
        name: "Индивидуальная подписка Spotify Lite Premium",
        path: "#",
      },
      {
        name: "Premium для двоих",
        path: "#",
      },
      {
        name: "Premium для семьи",
        path: "#",
      },
      {
        name: "Premium для студентов",
        path: "#",
      },
      {
        name: "Бесплатная версия Spotify Lite",
        path: "#",
      },
    ],
  },
  Socials: {
    name: "Социальные сети",
    links: [
      {
        name: "Instagram",
        path: "#",
        image: "/icon-instagram.svg",
      },
      {
        name: "Twitter",
        path: "#",
        image: "/icon-twitter.svg",
      },
      {
        name: "Facebook",
        path: "#",
        image: "/icon-facebook.svg",
      },
    ],
  },
};

export const artistMusicFilterList = {
  all: {
    name: "Все",
    path: "all",
  },
  album: {
    name: "Альбомы",
    path: "album",
  },
  single: {
    name: "Синглы",
    path: "single",
  },
} as {
  [key: string]: {
    name: string;
    path: string;
  };
};

export const artistMusicSortList = {
  releaseDate: {
    name: "Дата выпуска",
    path: "release_date",
    ascOrder: false,
  },
  name: {
    name: "Имя",
    path: "name",
    ascOrder: false,
  },
} as {
  [key: string]: {
    name: string;
    path: keyof Album;
    ascOrder: boolean;
  };
};

export const MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Фпрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
