import { Track } from "@shared/types/types";
import { createContext } from "react";

interface PlayerContextType {
  currentTrack: Track | undefined;
  handleSelectTrack: (track: Track) => void;
}

export const PlayerContext = createContext({} as PlayerContextType);
