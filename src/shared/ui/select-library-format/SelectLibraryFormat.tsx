import checkmark from "@shared/assets/checkmark-icon.svg";
import ListIcon from "@shared/assets/drop-down/list-icon.svg?react";
import GridIcon from "@shared/assets/drop-down/grid-icon.svg?react";
import CompactListIcon from "@shared/assets/compact-list-icon.svg?react";

export const SelectLibraryFormat = ({
  libraryFormat,
  setLibraryFormat,
  playlist,
}: {
  libraryFormat: string;
  setLibraryFormat: (format: string) => void;
  playlist?: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-xs text-zinc-400 p-2">Формат библиотеки</p>

      {playlist && (
        <button
          type="button"
          className={`flex gap-3 items-center hover:bg-zinc-600 p-2 ${
            libraryFormat === "compact" ? "text-green-400" : "text-white"
          }`}
          onClick={() => setLibraryFormat("compact")}
        >
          <CompactListIcon className="w-4 h-4" />
          Компактный
          {libraryFormat === "compact" && (
            <img src={checkmark} alt="checkmark" className="w-4 h-4 ml-auto" />
          )}
        </button>
      )}

      <button
        type="button"
        className={`flex gap-3 items-center hover:bg-zinc-600 p-2 ${
          libraryFormat === "list" ? "text-green-400" : "text-white"
        }`}
        onClick={() => setLibraryFormat("list")}
      >
        <ListIcon className="w-4 h-4" />
        Список
        {libraryFormat === "list" && (
          <img src={checkmark} alt="checkmark" className="w-4 h-4 ml-auto" />
        )}
      </button>

      {!playlist && (
        <button
          type="button"
          className={`flex gap-3 items-center hover:bg-zinc-600 p-2 ${
            libraryFormat === "grid" ? "text-green-400" : "text-white"
          }`}
          onClick={() => setLibraryFormat("grid")}
        >
          <GridIcon className="w-4 h-4" />
          Сетка
          {libraryFormat === "grid" && (
            <img src={checkmark} alt="checkmark" className="w-4 h-4 ml-auto" />
          )}
        </button>
      )}
    </div>
  );
};
