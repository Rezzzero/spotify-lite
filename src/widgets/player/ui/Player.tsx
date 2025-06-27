import { usePlayer } from "../model/usePlayer";
import PlayIcon from "@shared/assets/play-icon.svg?react";
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

export const Player = () => {
  const { user, offSound, handleToggleSound } = usePlayer();

  if (!user) return null;

  const playlistName = "Мой плейлист";

  return (
    <div className="flex w-full h-[65px] items-center justify-between gap-2 px-2">
      <h2>Track</h2>
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
        <CustomTooltip title="Слушать">
          <button type="button">
            <PlayIcon className="w-8 h-8 text-white hover:text-gray-200 cursor-pointer" />
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
        <CustomTooltip title={offSound ? "Включить звук" : "Выключить звук"}>
          {!offSound ? (
            <button
              type="button"
              onClick={handleToggleSound}
              className="cursor-pointer"
            >
              <LowSoundIcon className="w-5 h-5 text-gray-400 hover:text-white" />
              <NormalSoundIcon className="w-5 h-5 hidden text-gray-400 hover:text-white" />
              <LoudSoundIcon className="w-5 h-5 hidden text-gray-400 hover:text-white" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleToggleSound}
              className="cursor-pointer"
            >
              <OffSoundIcon className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          )}
        </CustomTooltip>
      </div>
    </div>
  );
};
