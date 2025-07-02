import { ReactNode, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import { TrackToAdd } from "@shared/types/types";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";

export const PlayerStoreProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<TrackToAdd | undefined>();
  const [currentTrackPageUrl, setCurrentTrackPageUrl] = useState<string>("");

  const handleSelectTrack = async (track: TrackToAdd) => {
    try {
      const response = await axios.post(`${API_URL}/get-track`, {
        track,
      });
      setCurrentTrackPageUrl(window.location.href);
      setCurrentTrack(response.data);
    } catch (error) {
      console.error("Error getting track:", error);
    }
  };

  return (
    <PlayerContext.Provider
      value={{ currentTrack, currentTrackPageUrl, handleSelectTrack }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
