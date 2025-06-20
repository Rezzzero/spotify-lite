import { createBrowserRouter } from "react-router-dom";
import { Route } from "@shared/constants/constants";
import App from "../App";
import { HomePage } from "@pages/home/HomePage";
import { SearchPage } from "@pages/search/SearchPage";
import { SectionPage } from "@pages/section/SectionPage";
import { ArtistPage } from "@pages/artist/ArtistPage";
import { TestPage } from "@pages/test/TestPage";
import { AlbumPage } from "@pages/album/AlbumPage";
import { TrackPage } from "@pages/track/TrackPage";
import { DiscographyPage } from "@pages/discography/DiscographyPage";
import { LoginPage } from "@pages/login/LoginPage";
import { RegistationPage } from "@pages/registration/RegistationPage";
import { PlaylistPage } from "@pages/playlist/PlaylistPage";
import { NotFoundPage } from "@pages/not-found/NotFoundPage";
import UserPage from "@pages/user/UserPage";

export const router = createBrowserRouter([
  {
    path: Route.HOME,
    element: <App />,
    children: [
      {
        path: Route.HOME,
        element: <HomePage />,
      },
      {
        path: Route.SEARCH,
        element: <SearchPage />,
      },
      {
        path: Route.SEARCH_BY_CATEGORY,
        element: <SearchPage />,
      },
      {
        path: Route.SECTION,
        element: <SectionPage />,
      },
      {
        path: Route.ALBUM,
        element: <AlbumPage />,
      },
      {
        path: Route.ARTIST,
        element: <ArtistPage />,
      },
      {
        path: Route.TRACK,
        element: <TrackPage />,
      },
      {
        path: Route.DISCOGRAPHY,
        element: <DiscographyPage />,
      },
      {
        path: Route.PLAYLIST,
        element: <PlaylistPage />,
      },
      {
        path: Route.TEST,
        element: <TestPage />,
      },
      {
        path: Route.USER,
        element: <UserPage />,
      },
    ],
  },
  {
    path: Route.LOGIN,
    element: <LoginPage />,
  },
  {
    path: Route.REGISTRATION,
    element: <RegistationPage />,
  },
  {
    path: Route.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);
