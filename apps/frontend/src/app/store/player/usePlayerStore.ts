import { useContext } from "react";
import { PlayerContext } from "./PlayerContext";

export const usePlayerStore = () => {
  const context = useContext(PlayerContext);
  return context;
};
