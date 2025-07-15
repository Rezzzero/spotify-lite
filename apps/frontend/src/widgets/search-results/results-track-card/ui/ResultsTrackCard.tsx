import { Track } from "@shared/types/types";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import { TrackCard } from "@shared/ui/track-card/TrackCard";
import SmallPlayIcon from "@shared/assets/small-play-icon.svg?react";
import SmallPauseIcon from "@shared/assets/small-pause-icon.svg?react";
import { useTrackCard } from "@features/track-card/model/useTrackCard";
import { TrackMenuButton } from "@shared/ui/track-menu-button/TrackMenuButton";
export const ResultsTrackCard = ({ track }: { track: Track }) => {
  const { isCurrent, isPlaying, pause, handleListenTrack } = useTrackCard({
    track,
  });

  return (
    <>
      <div className="relative flex items-center group hover:bg-[#333336] pr-4 rounded-md">
        <button
          type="button"
          onClick={() => {
            if (!isPlaying || (isPlaying && !isCurrent)) {
              handleListenTrack();
            } else {
              pause();
            }
          }}
          className="absolute left-5 flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-black/50 rounded-md hidden group-hover:block" />
          <CustomTooltip
            title={`Включить трек «${track.name}» исполнителя ${track.artists
              .map((artist) => artist.name)
              .join(", ")}`}
            placement="top"
          >
            <span>
              <SmallPlayIcon
                className={`w-5 h-5 hidden ${
                  isPlaying ? "" : "group-hover:block"
                } absolute top-1/2 left-1/4 -translate-y-1/2 z-10`}
              />
              <SmallPauseIcon
                className={`w-5 h-5 hidden ${
                  isPlaying ? "group-hover:block" : ""
                } absolute top-1/2 left-1/4 -translate-y-1/2 z-10`}
              />
            </span>
          </CustomTooltip>
        </button>
        <TrackCard
          track={track}
          withImage={true}
          withArtists={true}
          format="search"
          grid={true}
          addedAt={track.added_at}
          isCurrent={isCurrent}
        />
        <div className="absolite right-6 bottom-0 relative">
          <TrackMenuButton track={track} />
        </div>
      </div>
    </>
  );
};
