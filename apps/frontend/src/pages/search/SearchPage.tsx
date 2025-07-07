import { useParams } from "react-router-dom";
import { SearchResults } from "@widgets/search-results/ui/SearchResults";
import { Footer } from "@widgets/footer/ui/Footer";
import { CategoryList } from "@widgets/category-list/ui/CategoryList";
import { SearchCategoryResults } from "@widgets/search-category-results/ui/SearchCategoryResults";
import { PageLayout } from "@shared/ui/page-layout/PageLayout";

const SearchPage = () => {
  const { value, category } = useParams();

  if (!value) {
    return (
      <div className="py-4 px-9 bg-[#141414] w-full">
        <h1 className="text-xl font-bold mb-4">Категории и подборки</h1>
      </div>
    );
  }

  return (
    <PageLayout isSearchPage={true} isSectionPage={true} category={category}>
      <CategoryList />
      {!category && <SearchResults />}
      {category && <SearchCategoryResults />}
      <Footer />
    </PageLayout>
  );
};

export default SearchPage;
