import { Outlet } from "react-router-dom";
import { NavBar } from "../widgets/navbar/ui/NavBar";
import { MediaLibrary } from "../widgets/media-library/ui/MediaLibrary";

function App() {
  return (
    <>
      <NavBar />
      <div className="flex gap-2 px-2">
        <MediaLibrary />
        <Outlet />
      </div>
    </>
  );
}

export default App;
