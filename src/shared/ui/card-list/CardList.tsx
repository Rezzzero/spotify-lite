import { Link } from "react-router-dom";
import { Card } from "../card/Card";
import { Image } from "../../types/types";

interface ListItem {
  id: string;
  name: string;
  images: Image[];
}

export const CardList = ({
  title,
  titleLink,
  items,
  itemType,
  isSearchPage,
  isRoundedFull,
}: {
  title: string;
  titleLink: string;
  items: ListItem[];
  itemType: string;
  isSearchPage?: boolean;
  isRoundedFull?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Link to={titleLink} className="text-2xl font-bold px-3 hover:underline">
        {title}
      </Link>
      <div className="flex">
        {items.map((item, index) => (
          <Card
            key={index}
            image={item.images[0].url}
            name={item.name}
            link={`/${itemType}/${item.id}`}
            isSearchPage={isSearchPage}
            isRoundedFull={isRoundedFull}
          />
        ))}
      </div>
    </div>
  );
};
