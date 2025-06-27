import { ReactNode, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import { Track } from "@shared/types/types";

export const PlayerStoreProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>();

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
  }
  console.log(currentTrack)

  return (
    <PlayerContext.Provider value={{ currentTrack, handleSelectTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};
