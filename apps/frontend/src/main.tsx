import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./app/routes/router";
import { RouterProvider } from "react-router-dom";
import { SearchStoreProvider } from "@app/store/search/SearchStoreProvider";
import { UserStoreProvider } from "@app/store/user/UserStoreProvider";
import { MediaLibraryStoreProvider } from "@app/store/media-library/MediaLibraryStoreProvider";
import { PlayerStoreProvider } from "@app/store/player/PlayerStoreProvider";
import { TableProvider } from "@app/store/table/TableProvider";

createRoot(document.getElementById("root")!).render(
  <UserStoreProvider>
    <SearchStoreProvider>
      <PlayerStoreProvider>
        <MediaLibraryStoreProvider>
          <TableProvider>
            <RouterProvider router={router} />
          </TableProvider>
        </MediaLibraryStoreProvider>
      </PlayerStoreProvider>
    </SearchStoreProvider>
  </UserStoreProvider>
);
