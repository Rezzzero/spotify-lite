import { createContext } from "react";
import { SearchResults } from "../../shared/types/types";

export type SearchResultsContextType = {
  searchResults: SearchResults;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResults>>;
};

export const SearchResultsContext = createContext(
  {} as SearchResultsContextType
);
