import { Outlet } from "react-router-dom";
import { NavBar } from "../widgets/navbar/ui/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
