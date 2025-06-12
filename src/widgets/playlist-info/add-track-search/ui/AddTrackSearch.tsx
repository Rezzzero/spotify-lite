import SearchIcon from "@shared/assets/search-icon.svg?react";
import CrossIcon from "@shared/assets/cross-icon.svg?react";
import { useAddTrackSearch } from "../model/useAddTrackSearch";

export const AddTrackSearch = ({
  closeSearch,
}: {
  closeSearch: () => void;
}) => {
  const { value, setValue, results } = useAddTrackSearch();
  console.log(results);
  return (
    <div className="flex items-center justify-between pr-2 pt-5 border-t border-zinc-700">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">
          Давай добавим что-нибудь в твой плейлист
        </h2>
        <div className="relative bg-zinc-700 mt-5 rounded-sm p-2 pl-8">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Поиск треков"
            className="bg-transparent w-full outline-none placeholder:text-gray-300 pr-10"
          />
          <SearchIcon className="absolute top-1/2 transform -translate-y-1/2 left-2 w-5 h-5 text-gray-400" />
        </div>
      </div>
      <button type="button" onClick={() => closeSearch()}>
        <CrossIcon className="text-gray-400 w-5 h-5" />
      </button>
    </div>
  );
};
