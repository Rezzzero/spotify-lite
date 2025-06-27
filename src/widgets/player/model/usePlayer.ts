import { useUserStore } from "@app/store/user/useUser";
import { useState } from "react";

export const usePlayer = () => {
  const { user } = useUserStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [offSound, setOffSound] = useState(false);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  const handleToggleSound = () => {
    setOffSound(!offSound);
  };

  return {
    isPlaying,
    play,
    pause,
    user,
    offSound,
    handleToggleSound,
  };
};
