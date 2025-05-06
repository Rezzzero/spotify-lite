import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./app/routes/router";
import { RouterProvider } from "react-router-dom";
import { SearchResultsProvider } from "./app/store/SearchResultsProvider";

createRoot(document.getElementById("root")!).render(
  <SearchResultsProvider>
    <RouterProvider router={router} />
  </SearchResultsProvider>
);
