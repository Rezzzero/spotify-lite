import { Link } from "react-router-dom";
import { Card } from "../card/Card";
import { CardItem } from "../../types/types";

export const CardList = ({
  title,
  titleLink,
  items,
  itemType,
  isSearchPage,
  isCategoryPage,
  isSectionPage,
  grid,
}: {
  title?: string;
  titleLink?: string;
  items: CardItem[];
  itemType: string;
  isSearchPage?: boolean;
  isCategoryPage?: boolean;
  isSectionPage?: boolean;
  grid?: boolean;
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
      <div
        className={`flex ${grid || isCategoryPage ? "grid grid-cols-7" : ""} ${
          isSectionPage ? "grid grid-cols-8" : ""
        }`}
      >
        {items.map((item, index) => (
          <Card
            key={index}
            item={item}
            link={`/${itemType}/${item.id}`}
            isSearchPage={isSearchPage}
            cardType={itemType}
          />
        ))}
      </div>
    </div>
  );
};
