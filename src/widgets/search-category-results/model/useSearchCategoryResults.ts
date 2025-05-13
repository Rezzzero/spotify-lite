import { useParams } from "react-router-dom";
import { useSearchStore } from "../../../app/store/useSearchStore";
import {
  Album,
  Artist,
  Episode,
  Playlist,
  SearchResults,
  Show,
} from "../../../shared/types/types";

export const useSearchCategoryResults = () => {
  const { searchResults } = useSearchStore();
  const { category } = useParams<{ category?: keyof SearchResults }>();

  if (!category || !searchResults[category]) {
    return { items: [] };
  }

  const filteredItems = searchResults[category].items.filter((item) => {
    return (
      item &&
      typeof item === "object" &&
      "images" in item &&
      Array.isArray(
        (item as Artist | Album | Playlist | Show | Episode).images
      ) &&
      (item as Artist | Album | Playlist | Show | Episode).images.length > 0
    );
  });

  return {
    items: filteredItems,
    category,
  };
};
