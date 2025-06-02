import { useEffect } from "react";
import { useSearchStore } from "../../../app/store/search/useSearchStore";
import { CategoriesList } from "../../../shared/constants/constants";
import { useLocation, useParams } from "react-router-dom";

export const useCategoryList = () => {
  const { selectedCategory, setSelectedCategory } = useSearchStore();
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const location = useLocation();
  const { value: queryFromParams, category } = useParams();

  useEffect(() => {
    if (location.pathname.startsWith("/search") && !category) {
      setSelectedCategory("ALL");
    }
  }, [location.pathname, setSelectedCategory, category]);

  return {
    CategoriesList,
    selectedCategory,
    setSelectedCategory,
    handleSelectCategory,
    queryFromParams,
  };
};
