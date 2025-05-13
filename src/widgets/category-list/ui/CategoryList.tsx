import { Link } from "react-router-dom";
import { useCategoryList } from "../model/useCategoryList";

export const CategoryList = () => {
  const {
    CategoriesList,
    selectedCategory,
    handleSelectCategory,
    queryFromParams,
  } = useCategoryList();

  return (
    <div className="sticky top-0 left-0 bg-[#141414] flex gap-3 px-4 py-3 rounded-t-xl">
      {Object.keys(CategoriesList).map((category) => (
        <Link
          key={category}
          to={`/search/${queryFromParams}/${CategoriesList[category].path}`}
          onClick={() => handleSelectCategory(category)}
          className={`px-3 py-[6px] text-sm font-semibold rounded-full ${
            selectedCategory === category
              ? "bg-white text-black"
              : "bg-[#29292b] hover:bg-[#333336]"
          }`}
        >
          {CategoriesList[category].name}
        </Link>
      ))}
    </div>
  );
};
