import { useEffect, useState } from "react";
import { useSearchStore } from "../../../app/store/search/useSearchStore";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "@shared/constants/constants";

export const useSearchResults = () => {
  const { value: queryFromParams } = useParams();
  const { searchResults, setSearchResults } = useSearchStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isEmpty = !searchResults || Object.keys(searchResults).length === 0;

    if (!isEmpty) {
      setLoading(false);
      return;
    }

    if (queryFromParams) {
      const fetch = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/api/search?q=${queryFromParams}`
          );
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }
  }, [searchResults, setSearchResults, queryFromParams]);

  return { searchResults, loading };
};
