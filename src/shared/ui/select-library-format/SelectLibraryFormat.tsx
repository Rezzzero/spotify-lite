import checkmark from "@shared/assets/checkmark-icon.svg";
import ListIcon from "@shared/assets/drop-down/list-icon.svg?react";
import GridIcon from "@shared/assets/drop-down/grid-icon.svg?react";
import CompactListIcon from "@shared/assets/compact-list-icon.svg?react";
import { CustomTooltip } from "../tooltip/CustomTooltip";
import { libraryFormatList } from "@shared/constants/constants";

export const SelectLibraryFormat = ({
  libraryFormat,
  setLibraryFormat,
  playlist,
  onlyIcons,
}: {
  libraryFormat: string;
  setLibraryFormat: (format: string) => void;
  playlist?: boolean;
  onlyIcons?: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-xs text-zinc-400 p-2">Формат библиотеки</p>

      {onlyIcons ? (
        <div className="flex bg-zinc-900 rounded-md p-1">
          {libraryFormatList.map((item) => (
            <CustomTooltip key={item.name} title={item.name} placement="top">
              <button
                key={item.name}
                onClick={() => setLibraryFormat(item.value)}
                type="button"
                className={`flex group gap-3 ${
                  libraryFormat === item.value ? "bg-zinc-800" : ""
                } items-center p-2 px-4 cursor-pointer rounded-md`}
              >
                <item.icon
                  className={`${
                    libraryFormat === item.value
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } w-4 h-4`}
                />
              </button>
            </CustomTooltip>
          ))}
        </div>
      ) : (
        <>
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
                <img
                  src={checkmark}
                  alt="checkmark"
                  className="w-4 h-4 ml-auto"
                />
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
              <img
                src={checkmark}
                alt="checkmark"
                className="w-4 h-4 ml-auto"
              />
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
                <img
                  src={checkmark}
                  alt="checkmark"
                  className="w-4 h-4 ml-auto"
                />
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};
