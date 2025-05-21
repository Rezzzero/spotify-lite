import { createBrowserRouter } from "react-router-dom";
import { Route } from "../../shared/constants/constants";
import App from "../App";
import { HomePage } from "../../pages/home/HomePage";
import { SearchPage } from "../../pages/search/SearchPage";
import { SectionPage } from "../../pages/section/SectionPage";
import { ArtistPage } from "../../pages/artist/ArtistPage";
import { TestPage } from "../../pages/test/TestPage";
import { AlbumPage } from "../../pages/album/AlbumPage";
import { TrackPage } from "../../pages/track/TrackPage";
import { DiscographyPage } from "../../pages/discography/DiscographyPage";

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
        path: Route.TEST,
        element: <TestPage />,
      },
    ],
  },
]);
