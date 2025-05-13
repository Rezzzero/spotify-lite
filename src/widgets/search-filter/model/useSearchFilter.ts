import { FiltersList } from "../../../shared/constants/constants";
import { useSearchStore } from "../../../app/store/useSearchStore";

export const useSearchFilter = () => {
  const { selectedFilter, setSelectedFilter } = useSearchStore();
  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  return { FiltersList, selectedFilter, setSelectedFilter, handleSelectFilter };
};
