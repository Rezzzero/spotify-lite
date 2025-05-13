import { useParams } from "react-router-dom";
import { SearchResults } from "../../widgets/search-results/ui/SearchResults";
import { Footer } from "../../widgets/footer/ui/Footer";
import { SearchFilter } from "../../widgets/search-filter/ui/SearchFilter";

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
    <div className="flex flex-col gap-10 pb-4 pl-3 pr-5 bg-[#141414] w-[80%] h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-xl relative">
      <SearchFilter />
      <SearchResults />
      <Footer />
    </div>
  );
};
