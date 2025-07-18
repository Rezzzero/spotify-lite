import {
  PLAYLIST_PLACEHOLDER_URL,
  USER_PLACEHOLDER_URL,
} from "@shared/constants/urls";
import { SetStateAction } from "react";
import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import { Link } from "react-router-dom";
import { formatMsToMinutesAndSeconds } from "@shared/lib/format/msToMinutesAndSeconds";

interface MediaHeaderProps {
  imageColors: string[] | null;
  mainImage: string;
  mainName: string | undefined;
  isPublic?: boolean;
  ownerName?: string;
  ownerImage?: string;
  duration?: number;
  isOwner?: boolean;
  totalTracks?: number;
  openEditModal?: React.Dispatch<SetStateAction<boolean>>;
  link?: string;
  roundedFull?: boolean;
  releaseYear?: string;
  albumType?: string;
  albumName?: string;
  albumLink?: string;
  user?: boolean;
}

export const MediaHeader = ({
  imageColors,
  mainImage,
  mainName,
  isPublic,
  ownerName,
  ownerImage,
  duration,
  isOwner,
  totalTracks,
  link,
  openEditModal,
  roundedFull,
  releaseYear,
  albumType,
  albumName,
  albumLink,
  user,
}: MediaHeaderProps) => {
  const headerGradient = imageColors
    ? `linear-gradient(to bottom, ${imageColors[0]}, ${imageColors[1]})`
    : "linear-gradient(to bottom, #333, #222)";
  const opacityTwenty = mainImage !== PLAYLIST_PLACEHOLDER_URL;
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
        className={`flex items-center ${
          roundedFull ? "rounded-full" : "rounded-md"
        } bg-zinc-900 w-[232px] h-[232px] shadow-xl group relative`}
      >
        {isOwner ? (
          <>
            <img
              src={mainImage}
              alt="header main image"
              className={`w-full h-full object-cover ${
                roundedFull ? "rounded-full" : "rounded-md"
              } ${
                opacityTwenty
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
            src={mainImage}
            alt="playlist image"
            className={`w-full h-full object-cover ${
              roundedFull ? "rounded-full" : "rounded-md"
            }`}
          />
        )}
      </div>
      <div className="flex flex-col gap-3 pt-12 h-full">
        {user && <p className="text-sm font-semibold">Профиль</p>}
        {albumName && <p className="font-bold">Трек</p>}
        {albumType && <p>{albumType === "album" ? "Альбом" : "Сингл"}</p>}
        {isPublic !== undefined && isPublic !== null && (
          <h2>{isPublic ? "Открытый плейлист" : "Закрытый плейлист"}</h2>
        )}
        <h1 className="text-[90px] font-bold leading-none">{mainName}</h1>
        <div className="flex items-center gap-1 mt-auto">
          {link !== undefined && link !== null && (
            <>
              <img
                src={ownerImage}
                onError={(e) => {
                  e.currentTarget.src = USER_PLACEHOLDER_URL;
                }}
                alt="playlist creator image"
                className="w-6 h-6 rounded-full"
              />
              <Link
                to={link ? link : ""}
                className="font-bold text-sm hover:underline"
              >
                {ownerName ? ownerName : "owner"}
              </Link>
            </>
          )}
          {duration ? (
            <p className="font-semibold text-sm pb-1">
              {albumName && (
                <>
                  <span className="text-xl opacity-70 font-bold relative top-[1px] mx-1">
                    ·
                  </span>
                  <Link
                    to={albumLink || ""}
                    className="hover:underline opacity-90  text-white"
                  >
                    {albumName}
                  </Link>
                </>
              )}
              {releaseYear && (
                <>
                  <span className="text-xl font-bold relative top-[1px] mx-1">
                    ·
                  </span>
                  <span className="opacity-70">{releaseYear}</span>
                </>
              )}
              <span className="text-xl opacity-70 font-bold relative top-[1px] mx-1">
                ·
              </span>
              {totalTracks && totalTracks > 0 && (
                <span className="opacity-70">{totalTracks} треков, </span>
              )}
              <span className="opacity-70">
                {formatMsToMinutesAndSeconds(
                  duration,
                  albumName ? false : true
                )}
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
