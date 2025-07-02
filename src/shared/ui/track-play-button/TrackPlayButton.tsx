import { Track } from "@shared/types/types";
import { CustomTooltip } from "../tooltip/CustomTooltip";
import SmallPlayIcon from "@shared/assets/small-play-icon.svg?react";

export const TrackPlayButton = ({
  track,
  handleListenTrack,
  index,
  isCurrent,
}: {
  track: Track;
  index: number;
  handleListenTrack: (track: Track) => void;
  isCurrent: boolean;
}) => {
  return (
    <button
      onClick={() => handleListenTrack(track)}
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
        <SmallPlayIcon className="w-3 h-3 hidden group-hover:block" />
      </CustomTooltip>
    </button>
  );
};
