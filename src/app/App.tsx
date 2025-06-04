import { Outlet } from "react-router-dom";
import { NavBar } from "@widgets/navbar/ui/NavBar";
import { MediaLibrary } from "@widgets/media-library/ui/MediaLibrary";
import { AuthPromoBanner } from "@features/auth-promo-banner/ui/AuthPromoBanner";

function App() {
  return (
    <>
      <NavBar />
      <div className="flex gap-2 px-2 mb-2">
        <MediaLibrary />
        <Outlet />
      </div>
      <AuthPromoBanner />
    </>
  );
}

export default App;
