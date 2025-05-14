import { Link } from "react-router-dom";
import { Card } from "../card/Card";
import { Album, Artist, Episode, Playlist, Show } from "../../types/types";

export const CardList = ({
  title,
  titleLink,
  items,
  itemType,
  isSearchPage,
  isRoundedFull,
  isCategoryPage,
}: {
  title?: string;
  titleLink?: string;
  items: Album[] | Artist[] | Playlist[] | Show[] | Episode[];
  itemType: string;
  isSearchPage?: boolean;
  isRoundedFull?: boolean;
  isCategoryPage?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-3">
      {title && titleLink && (
        <Link
          to={titleLink}
          className="text-2xl font-bold px-3 hover:underline"
        >
          {title}
        </Link>
      )}
      <div className={`flex ${isCategoryPage ? "grid grid-cols-7" : ""}`}>
        {items.map((item, index) => (
          <Card
            key={index}
            item={item}
            link={`/${itemType}/${item.id}`}
            isSearchPage={isSearchPage}
            isRoundedFull={isRoundedFull}
            cardType={itemType}
          />
        ))}
      </div>
    </div>
  );
};
