import { Album, TablesTrack, Track } from "@shared/types/types";
import { CustomTooltip } from "../tooltip/CustomTooltip";
import SmallPlayIcon from "@shared/assets/small-play-icon.svg?react";
import SmallPauseIcon from "@shared/assets/small-pause-icon.svg?react";
import { usePlayerStore } from "@app/store/player/usePlayerStore";

export const TrackPlayButton = ({
  track,
  index,
  album,
}: {
  track: Track | TablesTrack;
  index: number;
  album?: Album;
}) => {
  const { currentTrack, currentTrackPageUrl, isPlaying, play, pause } =
    usePlayerStore();
  const isCurrent =
    currentTrack?.id === track?.id &&
    currentTrackPageUrl === window.location.href;

  const handleListenTrack = () => {
    const albumData = album
      ? {
          id: album.id,
          name: album.name,
          images: album.images,
        }
      : {
          id: track.album?.id ?? "",
          name: track.album?.name ?? "",
          images: track.album?.images ?? [],
        };
    const trackToAdd = {
      id: track.id,
      name: track.name,
      duration_ms: track.duration_ms,
      album: albumData,
      artists: track.artists ?? [],
      mp3_url: "",
    };

    if (isCurrent) {
      play();
    } else {
      play(trackToAdd);
    }
  };
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
      className="absolute top-4 left-5 group-hover:top-[22px] group-hover:left-4 flex items-center gap-2"
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
            className={`w-5 h-4 hidden ${
              isPlaying && isCurrent ? "" : "group-hover:block"
            }`}
          />
          <SmallPauseIcon
            className={`w-5 h-4 hidden ${
              isPlaying && isCurrent ? "group-hover:block" : ""
            }`}
          />
        </span>
      </CustomTooltip>
    </button>
  );
};
