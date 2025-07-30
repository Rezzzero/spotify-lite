import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import { Link } from "react-router-dom";
import { useMediaLibraryCard } from "../model/useMediaLibraryCard";
import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";
import { truncateText } from "@shared/lib/format/truncateText";
import PlayIcon from "@shared/assets/play-icon.svg?react";
import SmallPlayIcon from "@shared/assets/small-play-icon.svg?react";
import { CardMenu } from "../card-menu/ui/CardMenu";

interface MediaLibraryCardProps {
  image: string;
  name: string;
  id: string;
  ownerName?: string;
  type: "artist" | "playlist" | "album";
  isMediaLibraryOpen: boolean;
  libraryFormat: string;
  playlistPreviewImages?: { id: string; previewImage: string }[];
}

export const MediaLibraryCard = ({
  image,
  name,
  id,
  ownerName,
  type,
  isMediaLibraryOpen,
  libraryFormat,
  playlistPreviewImages,
}: MediaLibraryCardProps) => {
  const {
    currentId,
    cardMenuOpen,
    setCardMenuOpen,
    position,
    menuRef,
    handleOpenMenu,
  } = useMediaLibraryCard();

  const mainImage =
    type === "playlist"
      ? playlistPreviewImages?.find((p) => p.id === id)?.previewImage ||
        image ||
        PLAYLIST_PLACEHOLDER_URL
      : image;

  const mediaList = {
    artist: "Исполнитель",
    playlist: "Плейлист",
    album: "Альбом",
  };

  return (
    <CustomTooltip
      key={id}
      title={
        <>
          <h1 className="font-bold">{name}</h1>
          <span className="flex gap-1 font-normal text-sm text-gray-400">
            {mediaList[type]}{" "}
            {ownerName && (
              <>
                <p className="font-bold mt-[3px] text-lg leading-none">·</p>
                {ownerName}
              </>
            )}
          </span>
        </>
      }
      placement="right"
      disableHoverListener={
        isMediaLibraryOpen && libraryFormat !== "compact-grid"
      }
    >
      <Link
        to={`/${type}/${id}`}
        onContextMenu={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleOpenMenu(e);
        }}
        className={`${
          id === currentId
            ? "bg-zinc-800 hover:bg-zinc-700"
            : "hover:bg-zinc-800"
        } flex items-center ${
          !isMediaLibraryOpen ? "justify-center" : "gap-3"
        } rounded-md transition-colors group/card relative ${
          libraryFormat === "grid" && "flex-col"
        } ${libraryFormat === "compact-list" ? "p-1 pl-0" : "p-2"}`}
      >
        <img
          src={mainImage}
          alt={`${name} image`}
          className={`${libraryFormat === "compact-list" && "hidden"} ${
            libraryFormat === "compact-grid" || libraryFormat === "grid"
              ? "w-full h-25"
              : "w-12 h-12"
          } ${type === "artist" ? "rounded-full" : "rounded-md"}`}
        />
        {isMediaLibraryOpen && libraryFormat !== "compact-grid" && (
          <div
            className={`flex ${
              libraryFormat === "compact-list"
                ? "flex-row items-center"
                : "flex-col"
            }`}
          >
            <h1 className="font-bold text-sm">
              {libraryFormat === "grid" ? truncateText(name, 11) : name}
            </h1>
            <p className="flex gap-1 font-semibold text-sm text-gray-400">
              <span
                className={`font-bold text-lg leading-none ${
                  libraryFormat === "compact-list" ? "block ml-1" : "hidden"
                }`}
              >
                ·
              </span>
              {mediaList[type]}{" "}
              {ownerName && (
                <>
                  <span
                    className={`font-bold text-lg leading-none ${
                      libraryFormat === "compact-list" ? "hidden" : "block"
                    }`}
                  >
                    ·
                  </span>
                  <span
                    className={`${
                      libraryFormat === "compact-list" ? "hidden" : "block"
                    }`}
                  >
                    {libraryFormat === "grid"
                      ? truncateText(ownerName || "", 3)
                      : ownerName}
                  </span>
                </>
              )}
            </p>
          </div>
        )}
        {libraryFormat === "grid" && (
          <div className="absolute opacity-0 group-hover/playlistCard:opacity-100 top-1/2 -translate-y-1/2 right-3 transition-opacity duration-300 ease-in-out">
            <button
              type="button"
              className="bg-black rounded-full w-10 h-10 hover:scale-104 cursor-pointer"
            >
              <PlayIcon className="text-green-500 hover:text-green-400 w-full h-full" />
            </button>
          </div>
        )}
        {libraryFormat === "list" && (
          <div className="absolute opacity-0 group-hover/playlistCard:opacity-100 top-1/2 -translate-y-1/2 left-2 transition-opacity duration-300 ease-in-out">
            <div className="bg-black opacity-50 rounded-md w-12 h-12" />
            <button
              type="button"
              className="cursor-pointer z-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            >
              <SmallPlayIcon className="w-full h-full" />
            </button>
          </div>
        )}
        <CardMenu
          type={type}
          id={id}
          position={position}
          isOpen={cardMenuOpen}
          onClose={() => setCardMenuOpen(false)}
          ref={menuRef}
        />
      </Link>
    </CustomTooltip>
  );
};
