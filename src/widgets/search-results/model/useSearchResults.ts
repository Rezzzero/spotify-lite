import { useEffect } from "react";
import { useSearchStore } from "../../../app/store/search/useSearchStore";
import { useParams } from "react-router-dom";
import axios from "axios";

export const useSearchResults = () => {
  const { value: queryFromParams } = useParams();
  const { searchResults, setSearchResults } = useSearchStore();

  useEffect(() => {
    const isEmpty = !searchResults || Object.keys(searchResults).length === 0;

    if (isEmpty && queryFromParams) {
      const fetch = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/search?q=${queryFromParams}`
          );
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
      fetch();
    }
  }, [searchResults, setSearchResults, queryFromParams]);

  return { searchResults };
};
