import { useState, ReactNode } from "react";
import { SearchContext } from "./SearchContext";
import { SearchResults } from "../../shared/types/types";

export const SearchStoreProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState({} as SearchResults);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
