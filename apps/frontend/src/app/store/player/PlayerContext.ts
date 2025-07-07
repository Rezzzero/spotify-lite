import { TrackToAdd } from "@shared/types/types";
import { createContext } from "react";

interface PlayerContextType {
  currentTrack: TrackToAdd | undefined;
  currentTrackPageUrl: string;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  play: (track?: TrackToAdd) => Promise<void>;
  pause: () => void;
  handleToggleSound: () => void;
  soundValue: number;
  handleChangeSoundValue: (_: Event, newValue: number) => void;
  handleChangeCurrentTime: (_: Event, newValue: number) => void;
  currentTime: number;
}

export const PlayerContext = createContext({} as PlayerContextType);
