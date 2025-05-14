import { Link } from "react-router-dom";
import { Track } from "../../types/types";
import { formatMsToMinutesAndSeconds } from "../../lib/format/msToMinutes";

export const TrackCard = ({
  track,
  index,
}: {
  track: Track;
  index?: number;
}) => {
  return (
    <div
      className={`${
        index !== undefined
          ? "px-5 grid grid-cols-[30px_2fr_1fr_auto]"
          : "px-2 flex"
      } items-center py-[6px] pr-6 rounded-md group hover:bg-[#333336]`}
    >
      {index !== undefined && (
        <p className="text-gray-400 text-lg font-semibold">{index + 1}</p>
      )}
      <div className="flex gap-3">
        <img
          src={track.album.images[0].url}
          alt={`${track.name} image`}
          className="w-10 h-10 rounded-md"
        />
        <div>
          <Link to={`/track/${track.id}`} className="hover:underline">
            {track.name}
          </Link>
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
        </div>
      </div>
      {index !== undefined && (
        <Link
          to={`/album/${track.album.id}`}
          className="text-sm text-gray-400 pl-[6px] group-hover:text-white hover:underline"
        >
          {track.album.name}
        </Link>
      )}
      <p className="text-gray-400 ml-auto">
        {formatMsToMinutesAndSeconds(track.duration_ms)}
      </p>
    </div>
  );
};
