import { Track } from "@shared/types/types";
import { CustomTooltip } from "../tooltip/CustomTooltip";
import SmallPlayIcon from "@shared/assets/small-play-icon.svg?react";
import SmallPauseIcon from "@shared/assets/small-pause-icon.svg?react";

export const TrackPlayButton = ({
  track,
  handleListenTrack,
  index,
  isCurrent,
  isPlaying,
  pause,
}: {
  track: Track;
  index: number;
  handleListenTrack: () => void;
  isCurrent: boolean;
  isPlaying: boolean;
  pause: () => void;
}) => {
  return (
    <button
      onClick={() => {
        if (isCurrent) {
          if (isPlaying) {
            pause();
          } else {
            handleListenTrack();
          }
        } else {
          handleListenTrack();
        }
      }}
      type="button"
      className="absolute left-5 flex items-center gap-2"
    >
      <p
        className={`${
          isCurrent ? "text-green-400" : "text-gray-400"
        } text-lg group-hover:hidden font-semibold`}
      >
        {index + 1}
      </p>
      <CustomTooltip
        title={`Включить трек «${track.name}» исполнителя ${track.artists
          .map((artist) => artist.name)
          .join(", ")}`}
        placement="top"
      >
        <span>
          <SmallPlayIcon
            className={`w-3 h-3 hidden ${
              isPlaying && isCurrent ? "" : "group-hover:block"
            }`}
          />
          <SmallPauseIcon
            className={`w-3 h-3 hidden ${
              isPlaying && isCurrent ? "group-hover:block" : ""
            }`}
          />
        </span>
      </CustomTooltip>
    </button>
  );
};
