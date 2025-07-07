/// <reference types="vite-plugin-svgr/client" />

import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { NavBar } from "@widgets/navbar/ui/NavBar";
import { MediaLibrary } from "@widgets/media-library/ui/MediaLibrary";
import { AuthPromoBanner } from "@features/auth-promo-banner/ui/AuthPromoBanner";
import { Player } from "@widgets/player/ui/Player";
import { RequireAuthModal } from "@features/auth/require-auth-modal/ui/RequireAuthModal";

function App() {
  return (
    <>
      <NavBar />
      <div className="flex gap-2 px-2 mb-2">
        <MediaLibrary />
        <Outlet />
      </div>
      <AuthPromoBanner />
      <Player />
      <RequireAuthModal />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        closeButton={false}
      />
    </>
  );
}

export default App;
