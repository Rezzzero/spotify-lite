import { Link } from "react-router-dom";
import { Track } from "@shared/types/types";
import { formatMsToMinutesAndSeconds } from "@shared/lib/format/msToMinutesAndSeconds";
import { formatDate } from "@shared/lib/format/formatDate";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";

export const PlaylistTrackCard = ({
  track,
  index,
  libraryFormat,
}: {
  track: Track;
  index: number;
  libraryFormat: string;
}) => {
  return (
    <div
      className={`px-5 grid ${
        libraryFormat === "compact"
          ? "grid-cols-[30px_2fr_1fr_1fr_1fr_auto]"
          : "grid-cols-[30px_2fr_1fr_1fr_auto]"
      } items-center py-[6px] pr-6 rounded-md group hover:bg-[#333336]`}
    >
      <p className="text-gray-400 text-lg font-semibold">{index + 1}</p>
      <div className="flex items-center gap-4">
        {libraryFormat !== "compact" && (
          <img
            src={track.album.images[0].url}
            alt={`${track.name} image`}
            className="w-10 h-10 rounded-md"
          />
        )}
        <div>
          <CustomTooltip title={track.name} placement="top">
            <Link to={`/track/${track.id}`} className="hover:underline">
              {track.name}
            </Link>
          </CustomTooltip>
          {libraryFormat !== "compact" && (
            <CustomTooltip
              title={track.artists.map((artist) => artist.name).join(", ")}
              placement="top"
            >
              <div className="flex text-gray-400 flex-wrap">
                {track.artists.map((artist, index) => (
                  <div key={artist.id} className="flex items-center">
                    <Link
                      to={`/artist/${artist.id}`}
                      className="text-sm font-semibold hover:underline"
                    >
                      {artist.name}
                    </Link>
                    {index < track.artists.length - 1 && <span>,&nbsp;</span>}
                  </div>
                ))}
              </div>
            </CustomTooltip>
          )}
        </div>
      </div>
      {libraryFormat === "compact" && (
        <div className="text-gray-400">
          {track.artists.map((artist) => artist.name).join(", ")}
        </div>
      )}
      <Link
        to={`/album/${track.album.id}`}
        className="text-sm text-gray-400 pl-[6px] group-hover:text-white hover:underline"
      >
        {track.album.name}
      </Link>
      {track.added_at && (
        <p className="text-gray-400 pl-1">{formatDate(track.added_at)}</p>
      )}
      <p className="text-gray-400 ml-auto">
        {formatMsToMinutesAndSeconds(track.duration_ms)}
      </p>
    </div>
  );
};
