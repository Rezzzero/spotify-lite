/// <reference types="vite-plugin-svgr/client" />

import { TrackCard } from "@shared/ui/track-card/TrackCard";
import { useDiscography } from "../model/useDiscography";
import { Link } from "react-router-dom";
import clockIcon from "@shared/assets/clock-icon.svg";
import {
  artistMusicFilterList,
  artistMusicSortList,
} from "@shared/constants/constants";
import checkmark from "@shared/assets/checkmark-icon.svg";
import orderIcon from "@shared/assets/drop-down/order-icon.svg";
import DropDownIcon from "@shared/assets/drop-down/drop-down-arrow.svg?react";
import ListIcon from "@shared/assets/drop-down/list-icon.svg?react";
import GridIcon from "@shared/assets/drop-down/grid-icon.svg?react";
import { CardList } from "@shared/ui/card-list/CardList";
import playIcon from "@shared/assets/play-icon.svg";

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
    filteredDiscography: discography,
    selectedFilterByType,
    handleChangeFilter,
    sorting,
    sortDiscography,
    discographyFormat,
    setDiscographyFormat,
    albumRefs,
    activeAlbum,

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
  } = useDiscography({
    setIsFilterDropDownOpen,
    setIsSortDropDownOpen,
    scrollContainerRef,
  });

  if (discography.length === 0) return <div>Загрузка...</div>;
  return (
    <>
      <div className="sticky top-0 left-0 w-full flex flex-col px-5 py-3 bg-[#141414] z-10 text-white">
        <div className="flex gap-2 font-bold text-xl h-16 items-center">
          {activeAlbum && (
            <button type="button">
              <img src={playIcon} alt="play icon" className="w-12 h-12" />
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
          {discography.map((album, index) => (
            <div
              key={album.id}
              ref={(el) => {
                albumRefs.current[index] = el;
              }}
              data-name={album.name}
              className="flex flex-col gap-5"
            >
              <div className="flex gap-5 px-7">
                <img
                  src={album.images[0].url}
                  alt={`${album.name} image`}
                  className="w-32 h-32 rounded-md"
                />
                <div>
                  <Link
                    to={`/album/${album.id}`}
                    className="text-3xl font-bold hover:underline"
                  >
                    {album.name}
                  </Link>
                  <p className="font-bold text-zinc-400 text-sm leading-none pb-1">
                    {album.album_type === "album" ? "Альбом" : "Сингл"}
                    <span className="text-xl font-bold relative top-[2px] mx-1">
                      ·
                    </span>
                    {album.release_date.split("-")[0]}
                    <span className="text-xl font-bold relative top-[2px] mx-1">
                      ·
                    </span>
                    {album.total_tracks}{" "}
                    {album.total_tracks === 1 ? "трек" : "треков"}
                  </p>
                </div>
              </div>
              <div className="grid w-full items-center text-sm border-b border-zinc-800 text-gray-400 py-2 pr-6 grid-cols-[50px_2fr_1fr_auto]">
                <p className="text-lg pl-5 pr-4">#</p>
                <p>Название</p>
                <img
                  src={clockIcon}
                  alt="clock icon"
                  className="w-5 h-5 justify-self-end"
                />
              </div>
              <div className="flex flex-col">
                {album.tracks.items.map((track, index) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    index={index}
                    withNum
                    grid
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {discographyFormat === "grid" && (
        <CardList items={discography} itemType="album" grid />
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
          className="absolute top-20 right-10 bg-zinc-800 p-1 rounded-md flex flex-col"
        >
          <div className="flex flex-col border-b border-zinc-700">
            <p className="font-bold text-xs text-zinc-400 p-2">Сортировка</p>

            {Object.values(artistMusicSortList).map((sort) => (
              <button
                key={sort.name}
                className={`font-semibold text-sm p-2 w-34 flex justify-between rounded-xs hover:bg-zinc-700 ${
                  sorting.name === sort.name && "text-green-400"
                }`}
                onClick={() =>
                  sortDiscography(
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
                    className={`w-4 h-4 ${
                      sorting.ascOrder ? "rotate-180" : ""
                    } `}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-xs text-zinc-400 p-2">
              Формат библиотеки
            </p>

            <button
              type="button"
              className={`flex gap-3 items-center p-2 w-34 ${
                discographyFormat === "list" ? "text-green-400" : "text-white"
              }`}
              onClick={() => setDiscographyFormat("list")}
            >
              <ListIcon className="w-4 h-4" />
              Список
              {discographyFormat === "list" && (
                <img
                  src={checkmark}
                  alt="checkmark"
                  className="w-4 h-4 ml-auto"
                />
              )}
            </button>

            <button
              type="button"
              className={`flex gap-3 items-center p-2 w-34 ${
                discographyFormat === "grid" ? "text-green-400" : "text-white"
              }`}
              onClick={() => setDiscographyFormat("grid")}
            >
              <GridIcon className="w-4 h-4" />
              Сетка
              {discographyFormat === "grid" && (
                <img
                  src={checkmark}
                  alt="checkmark"
                  className="w-4 h-4 ml-auto"
                />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
