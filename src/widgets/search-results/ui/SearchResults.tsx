import { useSearchResults } from "../../../app/store/useSearchResults";

export const SearchResults = () => {
  const { searchResults } = useSearchResults();
  console.log(searchResults);
  return <div>SearchResults</div>;
};
