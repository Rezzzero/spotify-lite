import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchResults } from "@shared/types/types";
import { useSearchStore } from "../../../app/store/search/useSearchStore";
import { useDebouncedSearch } from "@shared/lib/hooks/useDebouncedSearch";

export const useSearchInput = () => {
  const [value, setValue] = useState("");
  const { setSearchResults } = useSearchStore();
  const [results, setResults] = useState({} as SearchResults);
  const navigate = useNavigate();
  useDebouncedSearch({ value, setResults: setSearchResults, redirect: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);

    if (!query) {
      navigate("/search");
      setResults({} as SearchResults);
    }
  };

  return {
    value,
    handleChange,
    setValue,
    results,
  };
};
