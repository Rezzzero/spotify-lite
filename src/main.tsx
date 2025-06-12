import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./app/routes/router";
import { RouterProvider } from "react-router-dom";
import { SearchStoreProvider } from "./app/store/search/SearchStoreProvider";
import { UserStoreProvider } from "./app/store/user/UserStoreProvider";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserStoreProvider>
      <SearchStoreProvider>
        <RouterProvider router={router} />
      </SearchStoreProvider>
    </UserStoreProvider>
  </StrictMode>
);
