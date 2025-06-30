import { usePlayerStore } from "@app/store/player/usePlayerStore";
import { useUserStore } from "@app/store/user/useUser";
import { useState, useEffect } from "react";

export const usePlayer = () => {
  const { user } = useUserStore();
  const { currentTrack } = usePlayerStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundValue, setSoundValue] = useState(50);
  const [lastSoundValue, setLastSoundValue] = useState(50);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setAudio(null);
    setCurrentTime(0);
    setIsPlaying(false);
  }, [currentTrack]);

  useEffect(() => {
    if (audio) {
      audio.volume = soundValue / 100;
    }
  }, [soundValue, audio]);

  useEffect(() => {
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime * 1000);
      audio.addEventListener("timeupdate", updateTime);
      return () => audio.removeEventListener("timeupdate", updateTime);
    }
  }, [audio]);

  const play = () => {
    if (currentTrack) {
      if (!audio) {
        const newAudio = new Audio(currentTrack.mp3_url);
        newAudio.volume = soundValue / 100;
        setAudio(newAudio);
        newAudio.play();
      } else {
        audio.play();
      }
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
  };

  const handleToggleSound = () => {
    if (soundValue > 0) {
      setLastSoundValue(soundValue);
      setSoundValue(0);
      if (audio) {
        audio.volume = 0;
      }
    } else {
      setSoundValue(lastSoundValue);
      if (audio) {
        audio.volume = lastSoundValue / 100;
      }
    }
  };

  const handleChangeSoundValue = (_: Event, newValue: number) => {
    setSoundValue(newValue);
    if (audio) {
      audio.volume = newValue / 100;
    }
    if (newValue > 0) {
      setLastSoundValue(newValue);
    }
  };

  return {
    isPlaying,
    play,
    pause,
    user,
    handleToggleSound,
    currentTrack,
    soundValue,
    handleChangeSoundValue,
    currentTime,
  };
};
