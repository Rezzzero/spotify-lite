import { ReactNode, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import { TrackToAdd } from "@shared/types/types";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";
import { useUserStore } from "../user/useUser";

export const PlayerStoreProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackToAdd | undefined>();
  const [currentTrackPageUrl, setCurrentTrackPageUrl] = useState<string>("");

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleSelectTrack = async (track: TrackToAdd) => {
    if (!user) {
      setCurrentTrack(track);
      openAuthModal();
      return;
    } else {
      try {
        const response = await axios.post(`${API_URL}/get-track`, {
          track,
        });
        setCurrentTrackPageUrl(window.location.href);
        setCurrentTrack(response.data);
      } catch (error) {
        console.error("Error getting track:", error);
      }
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        currentTrackPageUrl,
        handleSelectTrack,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
