import { Link } from "react-router-dom";
import { Artist, Image } from "../../types/types";
import { formatMsToMinutes } from "../../lib/format/msToMinutes";
import { formatReleaseDate } from "../../lib/format/releaseDate";

interface CardItem {
  name: string;
  images: Image[];
  artists?: Artist[];
  release_date?: string;
  owner?: {
    display_name: string;
  };
  publisher?: string;
  duration_ms?: number;
}

export const Card = ({
  item,
  link,
  isRoundedFull,
  isSearchPage,
  cardType,
}: {
  item: CardItem;
  link: string;
  isRoundedFull?: boolean;
  isSearchPage?: boolean;
  cardType?: string;
}) => {
  const year = item.release_date?.slice(0, 4);
  return (
    <div className="flex flex-col gap-3 rounded-md cursor-pointer p-3 w-[192px] h-[255px] hover:bg-[#1d1e1f]">
      <img
        src={item.images[0].url}
        alt={`${item.name} image`}
        className={`${isRoundedFull ? "rounded-full" : "rounded-xl"} ${
          isSearchPage ? "w-39 h-39" : "w-42 h-42"
        }`}
      />
      <Link to={link} className="hover:underline">
        {item.name}
      </Link>

      {cardType === "artist" && (
        <p className="text-sm text-gray-400">Исполнитель</p>
      )}
      {cardType === "album" && (
        <div className="flex gap-1 text-gray-400">
          <p>{year}</p>
          <p className="font-bold">·</p>
          <p>{item.artists?.[0].name}</p>
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
