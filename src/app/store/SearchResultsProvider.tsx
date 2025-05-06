import { useState, ReactNode } from "react";
import { SearchResultsContext } from "./SearchResultsContext";
import { SearchResults } from "../../shared/types/types";

export const SearchResultsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchResults, setSearchResults] = useState({} as SearchResults);

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
};
