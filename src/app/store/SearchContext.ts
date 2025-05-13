import { createContext } from "react";
import { SearchResults } from "../../shared/types/types";

export type SearchContextType = {
  searchResults: SearchResults;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResults>>;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = createContext({} as SearchContextType);
