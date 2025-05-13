import { createBrowserRouter } from "react-router-dom";
import { Route } from "../../shared/constants/constants";
import App from "../App";
import { HomePage } from "../../pages/home/HomePage";
import { SearchPage } from "../../pages/search/SearchPage";

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
        path: Route.ALBUM,
        element: <h1>Album</h1>,
      },
      {
        path: Route.ARTIST,
        element: <h1>Artist</h1>,
      },
    ],
  },
]);
