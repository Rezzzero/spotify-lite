import { useState, ReactNode } from "react";
import { SearchContext } from "./SearchContext";
import { SearchResults } from "../../shared/types/types";

export const SearchStoreProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState({} as SearchResults);
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults,
        selectedFilter,
        setSelectedFilter,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
