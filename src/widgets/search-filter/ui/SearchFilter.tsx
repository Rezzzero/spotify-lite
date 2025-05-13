import { useLocation } from "react-router-dom";
import { useSearchFilter } from "../model/useSearchFilter";
import { useEffect } from "react";

export const SearchFilter = () => {
  const { FiltersList, selectedFilter, setSelectedFilter, handleSelectFilter } =
    useSearchFilter();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/search")) {
      setSelectedFilter("ALL");
    }
  }, [location.pathname, setSelectedFilter]);

  return (
    <div className="sticky top-0 left-0 bg-[#141414] flex gap-3 px-4 py-3 rounded-t-xl">
      {Object.keys(FiltersList).map((filter) => (
        <button
          key={filter}
          onClick={() => handleSelectFilter(filter)}
          className={`px-3 py-[6px] text-sm font-semibold rounded-full ${
            selectedFilter === filter
              ? "bg-white text-black"
              : "bg-[#29292b] hover:bg-[#333336]"
          } cursor-pointer`}
        >
          {FiltersList[filter]}
        </button>
      ))}
    </div>
  );
};
