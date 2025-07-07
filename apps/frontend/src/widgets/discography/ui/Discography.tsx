import { useDiscography } from "../model/useDiscography";
import { Link } from "react-router-dom";
import { artistMusicFilterList } from "@shared/constants/constants";
import checkmark from "@shared/assets/checkmark-icon.svg";
import DropDownIcon from "@shared/assets/drop-down/drop-down-arrow.svg?react";
import ListIcon from "@shared/assets/drop-down/list-icon.svg?react";
import GridIcon from "@shared/assets/drop-down/grid-icon.svg?react";
import { CardList } from "@shared/ui/card-list/CardList";
import PlayIcon from "@shared/assets/play-icon.svg?react";
import { SelectLibraryFormat } from "@shared/ui/select-library-format/SelectLibraryFormat";
import { SelectSortFilter } from "@shared/ui/select-sort-filter/SelectSortFilter";
import { Loader } from "@shared/ui/loader/Loader";
import { AlbumList } from "../album-list/ui/AlbumList";

export const Discography = ({
  setIsFilterDropDownOpen,
  setIsSortDropDownOpen,
  scrollContainerRef,
}: {
  setIsFilterDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSortDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const {
    playlists,
    user,
    filteredDiscography: discography,
    selectedFilterByType,
    handleChangeFilter,
    sorting,
    sortDiscography,
    discographyFormat,
    setDiscographyFormat,
    activeAlbum,
    setActiveAlbum,
    filterDropDownRef,
    filterButtonRef,
    showFilterDropDown,
    handleShowFilterDropDown,
    handleHideFilterDropDown,
    sortDropDownRef,
    sortButtonRef,
    showSortDropDown,
    handleShowSortDropDown,
    handleHideSortDropDown,
    loading,
  } = useDiscography({
    setIsFilterDropDownOpen,
    setIsSortDropDownOpen,
  });

  if (loading || discography.length === 0)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  return (
    <>
      <div className="sticky top-0 left-0 w-full flex flex-col px-5 py-3 bg-[#141414] z-10 text-white">
        <div className="flex gap-2 font-bold text-xl h-16 items-center">
          {activeAlbum && (
            <button type="button">
              <PlayIcon className="w-12 h-12 text-green-400" />
            </button>
          )}
          {activeAlbum}
        </div>
        <div className="flex gap-7 w-full">
          <Link
            to={`/artist/${discography[0].artists[0].id}`}
            className="font-bold text-xl mr-auto hover:underline"
          >
            {discography[0].artists[0].name}
          </Link>
          <button
            type="button"
            ref={filterButtonRef}
            onClick={
              showFilterDropDown
                ? handleHideFilterDropDown
                : handleShowFilterDropDown
            }
            className="flex gap-2 text-zinc-400 items-center hover:text-white group cursor-pointer"
          >
            {artistMusicFilterList[selectedFilterByType].name}
            <DropDownIcon
              className={`w-4 h-4 ${
                showFilterDropDown && "rotate-180"
              } group-hover:fill-white`}
            />
          </button>
          <button
            type="button"
            ref={sortButtonRef}
            onClick={
              showSortDropDown ? handleHideSortDropDown : handleShowSortDropDown
            }
            className="flex gap-2 text-zinc-400 text-sm items-center hover:text-white cursor-pointer hover:scale-105 transition-all"
          >
            {sorting.name}
            {discographyFormat === "list" ? (
              <ListIcon className="w-4 h-4" />
            ) : (
              <GridIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {discographyFormat === "list" && (
        <div className="flex flex-col gap-10 px-5">
          <AlbumList
            albums={discography}
            scrollContainerRef={scrollContainerRef}
            setActiveAlbum={setActiveAlbum}
            playlists={playlists}
            userId={user?.user?.id}
          />
        </div>
      )}

      {discographyFormat === "grid" && (
        <>
          <CardList items={discography} itemType="album" grid />
        </>
      )}

      {showFilterDropDown && (
        <div
          ref={filterDropDownRef}
          className="absolute top-20 right-10 bg-zinc-800 p-1 rounded-md flex flex-col items-start"
        >
          {Object.values(artistMusicFilterList).map((filter) => (
            <button
              key={filter.name}
              className={`font-semibold text-sm p-2 w-34 flex justify-between rounded-xs hover:bg-zinc-700 ${
                selectedFilterByType === filter.path && "text-green-400"
              }`}
              onClick={() => handleChangeFilter(filter.path)}
            >
              {filter.name}
              {selectedFilterByType === filter.path && (
                <img src={checkmark} alt="checkmark" className="w-4 h-4 ml-1" />
              )}
            </button>
          ))}
        </div>
      )}

      {showSortDropDown && (
        <div
          ref={sortDropDownRef}
          className="absolute top-30 right-10 bg-zinc-800 p-1 rounded-md flex flex-col"
        >
          <SelectSortFilter sorting={sorting} setSorting={sortDiscography} />
          <SelectLibraryFormat
            libraryFormat={discographyFormat}
            setLibraryFormat={setDiscographyFormat}
          />
        </div>
      )}
    </>
  );
};
