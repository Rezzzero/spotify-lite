import { useParams } from "react-router-dom";

export const SearchPage = () => {
  const { value } = useParams();

  if (!value) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Категории и подборки</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search results for "{value}"</h1>
    </div>
  );
};
