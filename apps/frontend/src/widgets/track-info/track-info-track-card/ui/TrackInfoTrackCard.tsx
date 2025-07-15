import { Track } from "@shared/types/types";
import { TrackCard } from "@shared/ui/track-card/TrackCard";
import { TrackPlayButton } from "@shared/ui/track-play-button/TrackPlayButton";
import { useTrackCard } from "@features/track-card/model/useTrackCard";
import { TrackMenuButton } from "@shared/ui/track-menu-button/TrackMenuButton";
export const TrackInfoTrackCard = ({
  track,
  index,
}: {
  track: Track;
  index: number;
}) => {
  const { isCurrent } = useTrackCard({ track });

  return (
    <>
      <div className="relative flex items-center group hover:bg-[#333336] pr-4 pl-7 rounded-md">
        <TrackPlayButton track={track} index={index} />
        <TrackCard
          track={track}
          withImage={true}
          withArtists={true}
          withAlbumName={true}
          format="list"
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
