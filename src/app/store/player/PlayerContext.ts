import { TrackToAdd } from "@shared/types/types";
import { createContext } from "react";

interface PlayerContextType {
  currentTrack: TrackToAdd | undefined;
  handleSelectTrack: (track: TrackToAdd) => void;
}

export const PlayerContext = createContext({} as PlayerContextType);
