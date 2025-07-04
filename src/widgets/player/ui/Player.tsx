import { usePlayer } from "../model/usePlayer";
import PlayIcon from "@shared/assets/play-icon.svg?react";
import PauseIcon from "@shared/assets/playlist/pause-icon.svg?react";
import NextIcon from "@shared/assets/player/player-next-icon.svg?react";
import PrevIcon from "@shared/assets/player/player-prev-icon.svg?react";
import RandomIcon from "@shared/assets/player/player-random-icon.svg?react";
import RepeatIcon from "@shared/assets/player/player-repeat-icon.svg?react";
import RepeatActiveIcon from "@shared/assets/player/player-repeat-active.svg?react";
import NowPlayingIcon from "@shared/assets/player/player-now-playing-icon.svg?react";
import MicIcon from "@shared/assets/player/player-mic-icon.svg?react";
import OrderIcon from "@shared/assets/player/player-order-icon.svg?react";
import LowSoundIcon from "@shared/assets/player/player-low-sound-icon.svg?react";
import NormalSoundIcon from "@shared/assets/player/player-normal-sound-icon.svg?react";
import LoudSoundIcon from "@shared/assets/player/player-loud-sound-icon.svg?react";
import OffSoundIcon from "@shared/assets/player/playlist-off-sound.svg?react";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import { Link } from "react-router-dom";
import { Slider } from "@mui/material";
import { formatMsToMinutesAndSeconds } from "@shared/lib/format/msToMinutesAndSeconds";

export const Player = () => {
  const {
    user,
    handleToggleSound,
    play,
    pause,
    isPlaying,
    currentTrack,
    soundValue,
    handleChangeSoundValue,
    handleChangeCurrentTime,
    currentTime,
  } = usePlayer();

  if (!user) return null;

  const playlistName = "Мой плейлист";

  const noSound = soundValue <= 0;
  const lowSound = 0 < soundValue && soundValue < 20;
  const normalSound = 20 < soundValue && soundValue < 60;
  const loudSound = 60 < soundValue && soundValue <= 100;

  return (
    <div className="flex w-full h-full items-center justify-between gap-2 py-3 px-5">
      <div className="flex items-center gap-2 min-w-[180px] min-h-[56px]">
        {currentTrack ? (
          <>
            <img
              src={currentTrack.album.images[0].url}
              alt="track image"
              className="w-14 h-14 rounded-md"
            />
            <div className="flex flex-col">
              <Link
                to={`/track/${currentTrack.id}`}
                className="font-semibold hover:underline"
              >
                {currentTrack.name}
              </Link>
              <Link
                to={`/artist/${currentTrack.artists[0].id}`}
                className="text-gray-400 text-sm font-semibold hover:text-white hover:underline"
              >
                {currentTrack.artists[0].name}
              </Link>
            </div>
          </>
        ) : (
          <div className="w-14 h-14 rounded-md bg-zinc-800 animate-pulse" />
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="flex gap-5 items-center">
          <CustomTooltip title={`${playlistName}: включить случайный порядок`}>
            <button type="button">
              <RandomIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </button>
          </CustomTooltip>
          <CustomTooltip title="Назад">
            <button type="button">
              <PrevIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </button>
          </CustomTooltip>
          <CustomTooltip title={isPlaying ? "Пауза" : "Слушать"}>
            <button
              type="button"
              onClick={() => {
                if (isPlaying) {
                  pause();
                } else {
                  play();
                }
              }}
            >
              <PlayIcon
                className={`w-8 h-8 ${
                  isPlaying ? "hidden" : "block"
                } text-white hover:text-gray-200 cursor-pointer`}
              />
              <PauseIcon
                className={`w-8 h-8 ${
                  !isPlaying ? "hidden" : "block"
                } text-white hover:text-gray-200 cursor-pointer`}
              />
            </button>
          </CustomTooltip>
          <CustomTooltip title="Далее">
            <button type="button">
              <NextIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </button>
          </CustomTooltip>
          <CustomTooltip title="Повторять">
            <button type="button">
              <RepeatIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <RepeatActiveIcon className="hidden w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </button>
          </CustomTooltip>
        </div>
        <div className="flex items-center gap-1">
          {currentTrack && (
            <>
              <p className="text-gray-400 text-sm">
                {formatMsToMinutesAndSeconds(currentTime)}
              </p>
              <div className="flex items-center w-[400px]">
                <Slider
                  value={
                    currentTrack
                      ? (currentTime / currentTrack.duration_ms) * 100
                      : 0
                  }
                  onChange={handleChangeCurrentTime}
                  sx={{
                    "& .MuiSlider-thumb": {
                      opacity: 0,
                      width: 12,
                      height: 12,
                      background: "#ffffff",
                      transition: "opacity 0.2s ease-in-out",
                      "&:hover, &:focus": {
                        boxShadow: "none",
                      },
                      "&.Mui-focusVisible": {
                        boxShadow: "none",
                      },
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "#ffffff",
                      border: "none",
                      transition: "background-color 0.2s ease-in-out",
                      "&:hover, &:focus": {
                        boxShadow: "none",
                      },
                    },
                    "&:hover .MuiSlider-track": {
                      backgroundColor: "#4ADE80",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#4d4d4d",
                      "&:hover, &:focus": {
                        boxShadow: "none",
                      },
                    },
                    "&:hover .MuiSlider-thumb": {
                      opacity: 1,
                    },
                  }}
                />
              </div>
              <p className="text-gray-400 text-sm">
                {formatMsToMinutesAndSeconds(currentTrack.duration_ms)}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <CustomTooltip title="Экран «Сейчас играет»">
          <button type="button">
            <NowPlayingIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          </button>
        </CustomTooltip>
        <CustomTooltip title="Текст">
          <button type="button">
            <MicIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          </button>
        </CustomTooltip>
        <CustomTooltip title="Очередь">
          <button type="button">
            <OrderIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          </button>
        </CustomTooltip>
        <CustomTooltip title={noSound ? "Включить звук" : "Выключить звук"}>
          <button
            type="button"
            onClick={handleToggleSound}
            className="cursor-pointer"
          >
            <LowSoundIcon
              className={`w-5 h-5 ${
                lowSound ? "block" : "hidden"
              } text-gray-400 hover:text-white`}
            />
            <NormalSoundIcon
              className={`w-5 h-5 ${
                normalSound ? "block" : "hidden"
              } text-gray-400 hover:text-white`}
            />
            <LoudSoundIcon
              className={`w-5 h-5 ${
                loudSound ? "block" : "hidden"
              } text-gray-400 hover:text-white`}
            />
            <OffSoundIcon
              className={`w-5 h-5 ${
                noSound ? "block" : "hidden"
              } text-gray-400 hover:text-white`}
            />
          </button>
        </CustomTooltip>
        <div className="w-[100px] flex items-center pr-5">
          <Slider
            value={soundValue}
            onChange={handleChangeSoundValue}
            sx={{
              "& .MuiSlider-thumb": {
                opacity: 0,
                width: 12,
                height: 12,
                background: "#ffffff",
                transition: "opacity 0.2s ease-in-out",
                "&:hover, &:focus": {
                  boxShadow: "none",
                },
                "&.Mui-focusVisible": {
                  boxShadow: "none",
                },
              },
              "& .MuiSlider-track": {
                backgroundColor: "#ffffff",
                border: "none",
                transition: "background-color 0.2s ease-in-out",
                "&:hover, &:focus": {
                  boxShadow: "none",
                },
              },
              "&:hover .MuiSlider-track": {
                backgroundColor: "#4ADE80",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#4d4d4d",
                "&:hover, &:focus": {
                  boxShadow: "none",
                },
              },
              "&:hover .MuiSlider-thumb": {
                opacity: 1,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
