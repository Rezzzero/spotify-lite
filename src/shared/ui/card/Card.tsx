import { Link, useNavigate } from "react-router-dom";
import { CardItem } from "../../types/types";
import { formatMsToMinutes } from "../../lib/format/msToMinutes";
import { formatReleaseDate } from "../../lib/format/releaseDate";

export const Card = ({
  item,
  link,
  isSearchPage,
  cardType,
}: {
  item: CardItem;
  link: string;
  isSearchPage?: boolean;
  cardType?: string;
}) => {
  const navigate = useNavigate();
  const year = item.release_date?.slice(0, 4);
  return (
    <div
      onClick={() => navigate(link)}
      className="flex flex-col gap-3 rounded-md cursor-pointer p-3 w-[192px] h-[310px] hover:bg-[#1d1e1f]"
    >
      <img
        src={item.images[0].url}
        alt={`${item.name} image`}
        className={`${cardType === "artist" ? "rounded-full" : "rounded-xl"} ${
          isSearchPage ? "w-39 h-39" : "w-42 h-42"
        }`}
      />
      <Link
        to={link}
        onClick={(e) => e.stopPropagation()}
        className="hover:underline"
      >
        {item.name}
      </Link>

      {cardType === "track" && item.artists && (
        <div className="flex flex-wrap gap-x-1">
          {item.artists!.map((artist, index) => (
            <span key={artist.id}>
              <Link
                to={`/artist/${artist.id}`}
                onClick={(e) => e.stopPropagation()}
                className="text-sm font-semibold hover:underline"
              >
                {artist.name}
              </Link>
              {index < item.artists!.length - 1 && <span>,&nbsp;</span>}
            </span>
          ))}
        </div>
      )}

      {cardType === "artist" && (
        <p className="text-sm text-gray-400">Исполнитель</p>
      )}
      {cardType === "album" && (
        <div className="flex gap-1 text-gray-400">
          <p>{year}</p>
          <p className="font-bold">·</p>
          <Link
            to={`/artist/${item.artists?.[0].id}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:underline"
          >
            {item.artists?.[0].name}
          </Link>
        </div>
      )}
      {cardType === "playlist" && (
        <p className="text-sm text-gray-400">{item.owner?.display_name}</p>
      )}
      {cardType === "show" && (
        <p className="text-sm text-gray-400">{item.publisher}</p>
      )}
      {cardType === "episode" &&
        item.duration_ms !== undefined &&
        item.release_date && (
          <div className="flex text-sm gap-1 text-gray-400">
            <p>{formatReleaseDate(item.release_date)}</p>
            <p className="font-bold">·</p>
            <p>{formatMsToMinutes(item.duration_ms)}.</p>
          </div>
        )}
    </div>
  );
};
