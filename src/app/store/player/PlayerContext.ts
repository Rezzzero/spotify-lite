import { TrackToAdd } from "@shared/types/types";
import { createContext } from "react";

interface PlayerContextType {
  currentTrack: TrackToAdd | undefined;
  handleSelectTrack: (track: TrackToAdd) => void;
  currentTrackPageUrl: string;
}

export const PlayerContext = createContext({} as PlayerContextType);
