import { Track } from "@shared/types/types";
import { TrackCard } from "@shared/ui/track-card/TrackCard";
import { TrackPlayButton } from "@shared/ui/track-play-button/TrackPlayButton";
import { useTrackCard } from "@features/track-card/model/useTrackCard";
import { TrackMenuButton } from "@shared/ui/track-menu-button/TrackMenuButton";
export const ArtistInfoTrackCard = ({
  track,
  index,
  format,
}: {
  track: Track;
  index: number;
  format: string;
}) => {
  const { isCurrent } = useTrackCard({ track });

  return (
    <>
      <div className="relative flex items-center group hover:bg-[#333336] pr-4 pl-10 rounded-md">
        <TrackPlayButton track={track} index={index} />
        <TrackCard
          track={track}
          withArtists={true}
          addedAt={track.added_at}
          format={format}
          withImage={true}
          isCurrent={isCurrent}
        />
        <div className="absolite right-6 bottom-0 relative">
          <TrackMenuButton track={track} />
        </div>
      </div>
    </>
  );
};
