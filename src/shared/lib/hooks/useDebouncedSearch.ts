import { SearchResults } from "@shared/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useDebouncedSearch = ({
  value,
  setResults,
  redirect,
}: {
  value: string;
  setResults: React.Dispatch<React.SetStateAction<SearchResults>>;
  redirect?: boolean;
}) => {
  const [debouncedValue, setDebouncedValue] = useState("");
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
          setResults(searchRes.data);

          if (redirect) {
            navigate(`/search/${encodeURIComponent(debouncedValue)}`);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
      fetch();
    }
  }, [debouncedValue, setResults, navigate, redirect]);
};
