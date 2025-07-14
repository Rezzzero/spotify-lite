import { useParams } from "react-router-dom";
import { useSearchStore } from "../../../app/store/search/useSearchStore";
import { CardItem, SearchResults } from "@shared/types/types";
import { useUserStore } from "@app/store/user/useUser";

export const useSearchCategoryResults = () => {
  const { user } = useUserStore();
  const { searchResults } = useSearchStore();
  const { category } = useParams<{ category?: keyof SearchResults }>();

  if (!category || !searchResults[category]) {
    return { items: [] };
  }

  let filteredItems;

  if (category === "tracks") {
    filteredItems = searchResults[category].items.filter(
      (item) => item.album.images.length > 0
    );
  } else {
    filteredItems = searchResults[category].items.filter((item) => {
      return (
        item &&
        typeof item === "object" &&
        "images" in item &&
        Array.isArray((item as CardItem).images) &&
        (item as CardItem).images.length > 0
      );
    });
  }

  return {
    items: filteredItems,
    category,
    user,
  };
};
