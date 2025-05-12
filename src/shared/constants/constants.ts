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
