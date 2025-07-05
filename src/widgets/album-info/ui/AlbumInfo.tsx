import { Link } from "react-router-dom";
import { formatMsToMinutesAndSeconds } from "@shared/lib/format/msToMinutesAndSeconds";
import { useAlbumInfo } from "../model/useAlbumInfo";
import clockIcon from "@shared/assets/clock-icon.svg";
import { formatReleaseDate } from "@shared/lib/format/releaseDate";
import { CardList } from "@shared/ui/card-list/CardList";
import { truncateText } from "@shared/lib/format/truncateText";
import { Loader } from "@shared/ui/loader/Loader";
import { AlbumInfoTrackCard } from "../album-info-track-card/ui/AlbumInfoTrackCard";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import ListenIcon from "@shared/assets/play-icon.svg?react";
import PauseIcon from "@shared/assets/playlist/pause-icon.svg?react";
import InMediaLibraryIcon from "@shared/assets/playlist/playlist-in-media-library-icon.svg?react";
import AddToMediaLibraryIcon from "@shared/assets/playlist/add-to-media-library-icon.svg?react";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import ListIcon from "@shared/assets/drop-down/list-icon.svg?react";
import CompactListIcon from "@shared/assets/compact-list-icon.svg?react";

export const AlbumInfo = () => {
  const {
    albumData,
    imageColors,
    loading,
    playlists,
    user,
    handleDeleteFromMediaLibrary,
    handleAddToMediaLibrary,
  } = useAlbumInfo();
  if (loading || !albumData)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  const headerGradient = imageColors
    ? `linear-gradient(to bottom, ${imageColors[0]}, ${imageColors[1]})`
    : "linear-gradient(to bottom, #333, #222)";

  const sumOfDuration = albumData.album.tracks.items.reduce(
    (acc, track) => acc + track.duration_ms,
    0
  );

  const releaseYear = albumData.album.release_date.split("-")[0];
  const totalTracks = albumData.album.tracks.total;
  const duration = formatMsToMinutesAndSeconds(sumOfDuration, true);

  const isPlaying = false;

  const format = "compact";

  return (
    <div className="flex flex-col gap-5">
      <div
        style={{ background: headerGradient }}
        className="flex items-center gap-7 py-7 pl-7"
      >
        <img
          src={albumData.album.images[0].url}
          alt={albumData.album.name + " image"}
          className="rounded-md w-[232px] h-[232px] shadow-[0px_7px_58px_-2px_rgba(0,_0,_0,_0.6)]"
        />
        <div className="flex flex-col h-full pt-12 gap-2">
          <p>{albumData.album.album_type === "album" ? "Альбом" : "Сингл"}</p>
          <h2 className="text-[93px] font-bold leading-none mb-auto">
            {truncateText(albumData.album.name, 30)}
          </h2>
          <div className="flex items-center">
            <img
              src={albumData.artist.images[2].url}
              alt={`${albumData.artist.name} image`}
              className="w-6 h-6 rounded-full mr-1"
            />
            <Link
              to={`/artist/${albumData.artist.id}`}
              className="text-sm font-bold hover:underline"
            >
              {albumData.artist.name}
            </Link>
            <p className="opacity-70 font-semibold text-sm leading-none pb-1">
              <span className="text-xl font-bold relative top-[1px] mx-1">
                ·
              </span>
              {releaseYear}
              <span className="text-xl font-bold relative top-[1px] mx-1">
                ·
              </span>
              {totalTracks} треков, {duration}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center pt-3 px-8 justify-between w-full">
        <div className="flex items-center gap-4">
          {albumData.album.tracks.items.length > 0 && (
            <CustomTooltip
              title={isPlaying ? `Поставить на паузу` : `Слушать`}
              placement="top"
              customFontSize={13}
            >
              <button type="button">
                {isPlaying ? (
                  <PauseIcon className="w-12 h-12 text-green-500 hover:text-green-400 cursor-pointer hover:scale-105" />
                ) : (
                  <ListenIcon className="w-12 h-12 text-green-500 hover:text-green-400 cursor-pointer hover:scale-105" />
                )}
              </button>
            </CustomTooltip>
          )}
          {playlists.find((p) => p.id === albumData?.album.id) ? (
            <CustomTooltip
              title={`Удалить из медиатеки`}
              placement="top"
              customFontSize={13}
            >
              <button
                type="button"
                onClick={() =>
                  handleDeleteFromMediaLibrary(albumData?.album.id as string)
                }
              >
                <InMediaLibraryIcon className="w-7 h-7 text-gray-400 hover:text-white cursor-pointer hover:scale-105" />
              </button>
            </CustomTooltip>
          ) : (
            <CustomTooltip
              title={`Добавить в медиатеку`}
              placement="top"
              customFontSize={13}
            >
              <button
                type="button"
                onClick={() =>
                  handleAddToMediaLibrary(albumData?.album.id as string)
                }
              >
                <AddToMediaLibraryIcon className="w-7 h-7 text-gray-400 hover:text-white cursor-pointer hover:scale-105" />
              </button>
            </CustomTooltip>
          )}

          <CustomTooltip
            title={`Открыть контекстное меню: ${albumData.album.name}`}
            placement="top"
            customFontSize={13}
          >
            <button type="button">
              <MenuIcon className="w-10 h-10 text-gray-400 hover:text-white cursor-pointer hover:scale-105" />
            </button>
          </CustomTooltip>
        </div>
        <button
          type="button"
          className="flex gap-2 text-sm font-semibold items-center text-gray-400 group hover:text-white cursor-pointer"
        >
          {format === "compact" ? (
            <>
              <span>Компактный</span>
              <CompactListIcon className="w-3 h-3 text-gray-400 group-hover:text-white" />
            </>
          ) : (
            <>
              <span>Список</span>
              <ListIcon className="w-3 h-3 text-gray-400 group-hover:text-white" />
            </>
          )}
        </button>
      </div>
      <div className="px-7">
        <div className="grid w-full items-center text-sm border-b border-zinc-800 text-gray-400 py-2 pr-10 grid-cols-[50px_2fr_1fr_auto]">
          <p className="text-lg pl-5 pr-4">#</p>
          <p>Название</p>
          <img
            src={clockIcon}
            alt="clock icon"
            className="w-5 h-5 justify-self-end"
          />
        </div>
        <div className="flex flex-col">
          {albumData.album.tracks.items.map((track, index) => (
            <AlbumInfoTrackCard
              key={track.id}
              track={track}
              index={index}
              playlists={playlists}
              userId={user?.user?.id}
              album={albumData.album}
              isOwner={false}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col font-semibold text-[11px] text-zinc-400 px-7">
        <p className="font-bold text-sm">
          {formatReleaseDate(albumData.album.release_date, true)}
        </p>
        <p>
          © {releaseYear} {albumData.album.label}
        </p>
        <p>
          ℗ {releaseYear} {albumData.album.label}
        </p>
      </div>
      <div className="flex flex-col gap-5 px-5">
        <div className="flex justify-between px-2 font-bold">
          <Link
            to={`/artist/${albumData.artist.id}/discography`}
            className="text-2xl hover:underline"
          >
            {albumData.artist.name}: другие альбомы
          </Link>
          <Link
            to={`/artist/${albumData.artist.id}/discography`}
            className="text-zinc-400 text-sm hover:underline"
          >
            Открыть дискографию
          </Link>
        </div>
        <CardList items={albumData.otherAlbums.slice(0, 8)} itemType="album" />
      </div>
    </div>
  );
};
