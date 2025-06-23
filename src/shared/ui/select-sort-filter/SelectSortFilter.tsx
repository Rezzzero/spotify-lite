import { artistMusicSortList } from "@shared/constants/constants";
import orderIcon from "@shared/assets/drop-down/order-icon.svg";
import CheckmarkIcon from "@shared/assets/checkmark-icon.svg?react";
import { Album } from "@shared/types/types";

const mediaLibrarySortList = [
  {
    value: "recent",
    name: "Недавние",
  },
  {
    value: "recent-added",
    name: "Недавно добавленные",
  },
  {
    value: "alphabet",
    name: "По алфавиту",
  },
  {
    value: "owner-name",
    name: "По автору",
  },
];

export const SelectSortFilter = ({
  sorting,
  setSorting,
  isMediaLibrary,
  MediaLibrarySorting,
  setMediaLibrarySorting,
}: {
  sorting?: { name: string; ascOrder: boolean };
  setSorting?: (sortBy: keyof Album, name: string, ascOrder: boolean) => void;
  isMediaLibrary?: boolean;
  MediaLibrarySorting?: string;
  setMediaLibrarySorting?: (sort: { name: string; value: string }) => void;
}) => {
  return (
    <div className="flex flex-col border-b border-zinc-700 pb-1">
      <p className="font-bold text-xs text-zinc-400 p-2">Сортировка</p>
      {isMediaLibrary && (
        <div className="flex flex-col">
          {mediaLibrarySortList.map((sort) => (
            <button
              key={sort.name}
              onClick={() => setMediaLibrarySorting?.(sort)}
              className={`font-semibold text-sm p-2 flex items-center justify-between rounded-xs hover:bg-zinc-700 ${
                MediaLibrarySorting === sort.value && "text-green-400"
              }`}
            >
              {sort.name}
              {MediaLibrarySorting === sort.value && (
                <CheckmarkIcon className="w-5 h-5" />
              )}
            </button>
          ))}
        </div>
      )}
      {sorting && setSorting && (
        <div className="flex flex-col">
          {Object.values(artistMusicSortList).map((sort) => (
            <button
              key={sort.name}
              className={`font-semibold text-sm p-2 w-34 flex justify-between rounded-xs hover:bg-zinc-700 ${
                sorting.name === sort.name && "text-green-400"
              }`}
              onClick={() =>
                setSorting(
                  sort.path,
                  sort.name,
                  sorting.ascOrder === sort.ascOrder
                    ? !sort.ascOrder
                    : sort.ascOrder
                )
              }
            >
              {sort.name}
              {sorting.name === sort.name && (
                <img
                  src={orderIcon}
                  alt="order icon"
                  className={`w-4 h-4 ${sorting.ascOrder ? "rotate-180" : ""} `}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
