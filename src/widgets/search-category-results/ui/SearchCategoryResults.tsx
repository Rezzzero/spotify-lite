import {
  Album,
  Artist,
  Episode,
  Playlist,
  Show,
} from "../../../shared/types/types";
import { CardList } from "../../../shared/ui/card-list/CardList";
import { useSearchCategoryResults } from "../model/useSearchCategoryResults";

export const SearchCategoryResults = () => {
  const { items, category } = useSearchCategoryResults();
  if (category === "tracks") return null;

  return (
    <CardList
      items={items as Album[] | Artist[] | Playlist[] | Show[] | Episode[]}
      itemType={category as string}
      isRoundedFull={category === "artists"}
      isSearchPage
      isCategoryPage
    />
  );
};
