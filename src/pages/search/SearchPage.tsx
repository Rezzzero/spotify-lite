import { useParams } from "react-router-dom";
import { SearchResults } from "../../widgets/search-results/ui/SearchResults";

export const SearchPage = () => {
  const { value } = useParams();

  if (!value) {
    return (
      <div className="py-4 px-9 bg-[#141414] w-[80%]">
        <h1 className="text-xl font-bold mb-4">Категории и подборки</h1>
      </div>
    );
  }

  return (
    <div className="py-4 px-9 bg-[#141414] w-[80%]">
      <SearchResults />
    </div>
  );
};
