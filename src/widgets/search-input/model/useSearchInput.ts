import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchResults } from "@shared/types/types";
import { useSearchStore } from "../../../app/store/search/useSearchStore";

export const useSearchInput = () => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const { setSearchResults } = useSearchStore();
  const [results, setResults] = useState({} as SearchResults);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => clearTimeout(timeout);
  }, [value]);

  useEffect(() => {
    if (!debouncedValue) return;

    if (debouncedValue.length > 1) {
      const fetch = async () => {
        try {
          const searchRes = await axios.get(
            `http://localhost:3000/api/search?q=${debouncedValue}`
          );
          setSearchResults(searchRes.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
      fetch();
      navigate(`/search/${encodeURIComponent(debouncedValue)}`);
    }
  }, [debouncedValue, setSearchResults, navigate]);

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
