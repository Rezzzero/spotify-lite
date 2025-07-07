import { usePlayerStore } from "@app/store/player/usePlayerStore";
import { useUserStore } from "@app/store/user/useUser";

export const usePlayer = () => {
  const { user } = useUserStore();
  const {
    currentTrack,
    isPlaying,
    play,
    pause,
    handleToggleSound,
    soundValue,
    handleChangeSoundValue,
    handleChangeCurrentTime,
    currentTime,
  } = usePlayerStore();

  return {
    isPlaying,
    play,
    pause,
    user,
    handleToggleSound,
    currentTrack,
    soundValue,
    handleChangeSoundValue,
    handleChangeCurrentTime,
    currentTime,
  };
};
