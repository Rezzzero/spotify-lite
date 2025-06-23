import { Playlist } from "@shared/types/types";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import { PLAYLIST_PLACEHOLDER_URL } from "@shared/constants/urls";
import { Link } from "react-router-dom";
import { SupabasePlaylist } from "@shared/types/playlist";
import { truncateText } from "@shared/lib/format/truncateText";
import PlayIcon from "@shared/assets/play-icon.svg?react";
import SmallPlayIcon from "@shared/assets/small-play-icon.svg?react";

interface PlaylistCardProps {
  playlist: Playlist | SupabasePlaylist;
  isMediaLibraryOpen: boolean;
  playlistPreviewImages: { id: string; previewImage: string }[];
  id: string | undefined;
  libraryFormat: string;
}

export const PlaylistCard = ({
  playlist,
  isMediaLibraryOpen,
  playlistPreviewImages,
  id,
  libraryFormat,
}: PlaylistCardProps) => {
  return (
    <CustomTooltip
      key={playlist.id}
      title={
        <>
          <h1 className="font-bold">{playlist.name}</h1>
          <span className="flex gap-1 font-normal text-sm text-gray-400">
            Плейлист{" "}
            <p className="font-bold mt-[3px] text-lg leading-none">·</p>
            {playlist.owner?.display_name}
          </span>
        </>
      }
      placement="right"
      disableHoverListener={
        isMediaLibraryOpen && libraryFormat !== "compact-grid"
      }
    >
      <Link
        to={`/playlist/${playlist.id}`}
        className={`${
          id === playlist.id
            ? "bg-zinc-800 hover:bg-zinc-700"
            : "hover:bg-zinc-800"
        } flex items-center ${
          !isMediaLibraryOpen ? "justify-center" : "gap-3"
        } rounded-md transition-colors group/playlistCard relative ${
          libraryFormat === "grid" && "flex-col"
        } ${libraryFormat === "compact-list" ? "p-1 pl-0" : "p-2"}`}
      >
        <img
          src={
            playlistPreviewImages.find((p) => p.id === playlist.id)
              ?.previewImage ||
            playlist.images[0]?.url ||
            PLAYLIST_PLACEHOLDER_URL
          }
          alt={playlist.name}
          className={`${libraryFormat === "compact-list" && "hidden"} ${
            libraryFormat === "compact-grid" || libraryFormat === "grid"
              ? "w-full h-25"
              : "w-12 h-12"
          } rounded-md`}
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
              {libraryFormat === "grid"
                ? truncateText(playlist.name, 11)
                : playlist.name}
            </h1>
            <p className="flex gap-1 font-semibold text-sm text-gray-400">
              <span
                className={`font-bold text-lg leading-none ${
                  libraryFormat === "compact-list" ? "block ml-1" : "hidden"
                }`}
              >
                ·
              </span>
              Плейлист{" "}
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
                {playlist.owner?.display_name}
              </span>
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
      </Link>
    </CustomTooltip>
  );
};
