import { useContext } from "react";
import { SearchResultsContext } from "./SearchResultsContext";

export const useSearchResults = () => {
  const context = useContext(SearchResultsContext);
  return context;
};
