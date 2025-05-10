import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./app/routes/router";
import { RouterProvider } from "react-router-dom";
import { SearchStoreProvider } from "./app/store/SearchStoreProvider";

createRoot(document.getElementById("root")!).render(
  <SearchStoreProvider>
    <RouterProvider router={router} />
  </SearchStoreProvider>
);
