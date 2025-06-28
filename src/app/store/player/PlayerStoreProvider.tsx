import { ReactNode, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import { TrackToAdd } from "@shared/types/types";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";

export const PlayerStoreProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<TrackToAdd | undefined>();

  const handleSelectTrack = async (track: TrackToAdd) => {
    try {
      const response = await axios.post(`${API_URL}/get-track`, {
        track,
      });

      setCurrentTrack(response.data);
    } catch (error) {
      console.error("Error getting track:", error);
    }
  };
  console.log(currentTrack);

  return (
    <PlayerContext.Provider value={{ currentTrack, handleSelectTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};
