import { Link } from "react-router-dom";
import { Track } from "../../types/types";
import { formatMsToMinutesAndSeconds } from "../../lib/format/msToMinutesAndSeconds";
import { CustomTooltip } from "../tooltip/CustomTooltip";
import { memo } from "react";
import { formatAddedAt } from "../../lib/format/formatAddedAt";
import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";

export const TrackCard = memo(
  ({
    track,
    withAlbumName,
    withImage,
    withArtists,
    grid,
    format,
    addedAt,
    isCurrent,
  }: {
    track: Track;
    index: number;
    withAlbumName?: boolean;
    withImage?: boolean;
    withArtists?: boolean;
    grid?: boolean;
    format?: string;
    addedAt?: string;
    isCurrent: boolean;
  }) => {
    let gridCols = "";
    if (grid) {
      if (format === "compact") {
        gridCols = "grid-cols-[2fr_1fr_1fr_1fr_auto]";
      } else if (format === "list") {
        gridCols = "grid-cols-[2fr_1fr_1fr_auto]";
      } else if (format === "search" || format === "discography") {
        gridCols = "grid-cols-[1fr_2fr_auto]";
      } else {
        gridCols = "grid-cols-[30px_2fr_1fr_auto]";
      }
    }

    const cardClassName = [
      grid ? "px-5 grid" : "px-2 flex",
      grid ? gridCols : "",
      "items-center w-full py-[6px] pr-6 rounded-md group bg-transparent",
    ].join(" ");

    return (
      <div className={cardClassName}>
        <div className="flex items-center gap-4">
          {withImage && format !== "compact" && (
            <img
              src={
                track.album.images[0] !== undefined
                  ? track.album.images[0].url
                  : PLAYLIST_PLACEHOLDER_URL
              }
              alt={`${track.name} image`}
              className="w-10 h-10 rounded-md"
            />
          )}
          <div>
            <CustomTooltip title={track.name} placement="top">
              <Link
                to={`/track/${track.id}`}
                className={`hover:underline ${
                  isCurrent ? "text-green-400" : "text-white"
                }`}
              >
                {track.name}
              </Link>
            </CustomTooltip>
            {withArtists && format !== "compact" && (
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
        {format === "compact" && (
          <p className="text-gray-400">
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        )}
        {withAlbumName && (
          <Link
            to={`/album/${track.album.id}`}
            className="text-sm text-gray-400 pl-[6px] group-hover:text-white hover:underline"
          >
            {track.album.name}
          </Link>
        )}
        {addedAt && (
          <p className="text-gray-400 pl-1">{formatAddedAt(addedAt)}</p>
        )}
        <p className="text-gray-400 ml-auto">
          {formatMsToMinutesAndSeconds(track.duration_ms)}
        </p>
      </div>
    );
  }
);
