import { createBrowserRouter } from "react-router-dom";
import { Route } from "@shared/constants/constants";
import App from "../App";
import { lazy } from "react";

const HomePage = lazy(() => import("@pages/home/HomePage"));
const SearchPage = lazy(() => import("@pages/search/SearchPage"));
const SectionPage = lazy(() => import("@pages/section/SectionPage"));
const ArtistPage = lazy(() => import("@pages/artist/ArtistPage"));
const TestPage = lazy(() => import("@pages/test/TestPage"));
const AlbumPage = lazy(() => import("@pages/album/AlbumPage"));
const TrackPage = lazy(() => import("@pages/track/TrackPage"));
const DiscographyPage = lazy(
  () => import("@pages/discography/DiscographyPage")
);
const LoginPage = lazy(() => import("@pages/login/LoginPage"));
const RegistationPage = lazy(
  () => import("@pages/registration/RegistationPage")
);
const PlaylistPage = lazy(() => import("@pages/playlist/PlaylistPage"));
const NotFoundPage = lazy(() => import("@pages/not-found/NotFoundPage"));
const UserPage = lazy(() => import("@pages/user/UserPage"));
const UserFollowingPage = lazy(
  () => import("@pages/user/following/UserFollowingPage")
);
const UserFollowersPage = lazy(
  () => import("@pages/user/followers/UserFollowersPage")
);
const UserPlaylistsPage = lazy(
  () => import("@pages/user/playlists/UserPlaylistsPage")
);

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
      {
        path: Route.USER_FOLLOWING,
        element: <UserFollowingPage />,
      },
      {
        path: Route.USER_FOLLOWERS,
        element: <UserFollowersPage />,
      },
      {
        path: Route.USER_PLAYLISTS,
        element: <UserPlaylistsPage />,
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
