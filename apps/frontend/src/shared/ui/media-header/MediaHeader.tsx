import {
  PLAYLIST_PLACEHOLDER_URL,
  USER_PLACEHOLDER_URL,
} from "@shared/constants/urls";
import React, { SetStateAction } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import { Track } from "@shared/types/types";
import { formatMsToMinutesAndSeconds } from "@shared/lib/format/msToMinutesAndSeconds";
import { PlaylistData } from "@widgets/playlist-info/types/types";

interface MediaHeaderProps {
  imageColors: string[] | null;
  isOwner: boolean;
  playlistData: PlaylistData | null;
  playlistPreviewImages: {
    id: string;
    previewImage: string;
  }[];
  openEditModal?: React.Dispatch<SetStateAction<boolean>>;
  tracks: Track[];
}
//нужно доделать чтобы он принимал пропсы ещё с страниц Альбомов, Артистов, Треков и Пользователей
export const MediaHeader = ({
  imageColors,
  isOwner,
  playlistData,
  playlistPreviewImages,
  openEditModal,
  tracks,
}: MediaHeaderProps) => {
  const headerGradient = imageColors
    ? `linear-gradient(to bottom, ${imageColors[0]}, ${imageColors[1]})`
    : "linear-gradient(to bottom, #333, #222)";
  return (
    <div
      style={{ background: headerGradient }}
      className="flex items-center gap-7 p-7"
    >
      <div
        onClick={() => {
          if (isOwner && openEditModal) {
            openEditModal((prev) => !prev);
          }
        }}
        className="flex items-center bg-zinc-900 rounded-md w-[232px] h-[232px] shadow-xl group relative"
      >
        {isOwner ? (
          <>
            <img
              src={
                playlistPreviewImages.find(
                  (p) => p.id === playlistData?.playlist.id
                )?.previewImage ||
                playlistData?.playlist.images[0]?.url ||
                playlistData?.imageUrl ||
                PLAYLIST_PLACEHOLDER_URL
              }
              alt="playlist image"
              className={`w-full h-full object-cover rounded-md ${
                playlistPreviewImages.find(
                  (p) => p.id === playlistData?.playlist.id
                )?.previewImage ||
                playlistData?.playlist.images[0]?.url ||
                playlistData?.imageUrl
                  ? "group-hover:opacity-20"
                  : "group-hover:opacity-0"
              } transition-opacity duration-200`}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <EditIcon className="w-13 h-13" />
              <p className="font-bold">Выбрать фото</p>
            </div>
          </>
        ) : (
          <img
            src={
              playlistData?.playlist.images[0]?.url ||
              playlistData?.imageUrl ||
              PLAYLIST_PLACEHOLDER_URL
            }
            alt="playlist image"
            className="w-full h-full object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex flex-col gap-3 pt-12 h-full">
        <h2>
          {playlistData?.playlist?.public
            ? "Открытый плейлист"
            : "Закрытый плейлист"}
        </h2>
        <h1 className="text-[90px] font-bold leading-none">
          {playlistData?.playlist?.name}
        </h1>
        <div className="flex items-center gap-1 mt-auto">
          <img
            src={
              playlistData?.playlist?.owner?.imageUrl
                ? playlistData.playlist.owner.imageUrl
                : USER_PLACEHOLDER_URL
            }
            onError={(e) => {
              e.currentTarget.src = USER_PLACEHOLDER_URL;
            }}
            alt="playlist creator image"
            className="w-6 h-6 rounded-full"
          />
          <Link
            to={`/user/${playlistData?.playlist?.owner?.id}`}
            className="font-bold text-sm hover:underline"
          >
            {playlistData
              ? playlistData.playlist?.owner?.display_name
              : "owner"}
          </Link>
          {playlistData?.playlist?.duration && tracks.length > 0 ? (
            <p className="font-semibold opacity-70 text-sm pb-1">
              <span className="text-xl font-bold relative top-[1px] mx-1">
                ·
              </span>
              {tracks.length} треков,{" "}
              {formatMsToMinutesAndSeconds(
                playlistData?.playlist?.duration,
                true
              )}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
