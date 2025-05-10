import { useContext } from "react";
import { SearchContext } from "./SearchContext";

export const useSearchStore = () => {
  const context = useContext(SearchContext);
  return context;
};
