import { ReactNode, useEffect, useRef, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import { TrackToAdd } from "@shared/types/types";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";
import { useUserStore } from "../user/useUser";

export const PlayerStoreProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackToAdd | undefined>();
  const [currentTrackPageUrl, setCurrentTrackPageUrl] = useState<string>("");
  const [soundValue, setSoundValue] = useState(50);
  const [lastSoundValue, setLastSoundValue] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime * 1000);
    audio.addEventListener("timeupdate", updateTime);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = soundValue / 100;
    }
  }, [soundValue]);

  const play = async (track?: TrackToAdd) => {
    if (!user) {
      if (track) setCurrentTrack(track);
      openAuthModal();
      return;
    }

    if (track) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      try {
        const response = await axios.post(`${API_URL}/get-track`, { track });
        setCurrentTrackPageUrl(window.location.href);
        setCurrentTrack(response.data);

        const newAudio = new Audio(response.data.mp3_url);
        newAudio.volume = soundValue / 100;
        audioRef.current = newAudio;
        newAudio.play();
        setIsPlaying(true);
        setCurrentTime(0);
        return;
      } catch (error) {
        console.error("Error getting track:", error);
        return;
      }
    }

    if (currentTrack) {
      if (!audioRef.current) {
        const newAudio = new Audio(currentTrack.mp3_url);
        newAudio.volume = soundValue / 100;
        audioRef.current = newAudio;
        newAudio.play();
        setCurrentTime(0);
      } else {
        audioRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleToggleSound = () => {
    if (soundValue > 0) {
      setLastSoundValue(soundValue);
      setSoundValue(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    } else {
      setSoundValue(lastSoundValue);
      if (audioRef.current) {
        audioRef.current.volume = lastSoundValue / 100;
      }
    }
  };

  const handleChangeSoundValue = (_: Event, newValue: number) => {
    setSoundValue(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
    if (newValue > 0) {
      setLastSoundValue(newValue);
    }
  };

  const handleChangeCurrentTime = (_: Event, newValue: number) => {
    if (audioRef.current && currentTrack) {
      const newTime = (newValue / 100) * (currentTrack.duration_ms / 1000);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime * 1000);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        currentTrackPageUrl,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isPlaying,
        setIsPlaying,
        play,
        pause,
        handleToggleSound,
        soundValue,
        handleChangeSoundValue,
        handleChangeCurrentTime,
        currentTime,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
