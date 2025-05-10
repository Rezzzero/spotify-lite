import { useEffect, useState } from "react";
import { useSearchStore } from "../../../app/store/useSearchStore";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiltersList } from "../../../shared/constants/constants";

export const useSearchResults = () => {
  const { value: queryFromParams } = useParams();
  const { searchResults, setSearchResults } = useSearchStore();
  const [selectedFilter, setSelectedFilter] = useState("ALL");

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

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  return { searchResults, FiltersList, selectedFilter, handleSelectFilter };
};
