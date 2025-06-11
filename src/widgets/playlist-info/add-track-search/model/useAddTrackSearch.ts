import { useDebouncedSearch } from "@shared/lib/hooks/useDebouncedSearch";
import { SearchResults } from "@shared/types/types";
import { useState } from "react";

export const useAddTrackSearch = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState({} as SearchResults);

  useDebouncedSearch({ value, setResults, redirect: false });

  return { value, setValue, results };
};
