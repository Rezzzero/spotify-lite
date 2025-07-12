import { Link } from "react-router-dom";
import { formatMsToMinutesAndSeconds } from "@shared/lib/format/msToMinutesAndSeconds";
import { useAlbumInfo } from "../model/useAlbumInfo";
import { formatReleaseDate } from "@shared/lib/format/releaseDate";
import { CardList } from "@shared/ui/card-list/CardList";
import { truncateText } from "@shared/lib/format/truncateText";
import { Loader } from "@shared/ui/loader/Loader";
import { MediaControls } from "@features/media-controls/ui/MediaControls";
import { Table } from "@shared/ui/table/Table";

export const AlbumInfo = () => {
  const {
    albumData,
    imageColors,
    loading,
    isPlaying,
    handleDeleteFromMediaLibrary,
    handleAddToMediaLibrary,
    setMenuModal,
    setChangeFormatModal,
    handleListenPlaylist,
    changeFormatButtonRef,
    menuButtonRef,
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
      <div className="px-7">
        <MediaControls
          isOwner={false}
          isPlaying={isPlaying}
          format={format}
          mediaData={albumData.album}
          tracks={albumData.album.tracks.items}
          menuButtonRef={menuButtonRef}
          changeFormatButtonRef={changeFormatButtonRef}
          onPlay={() => handleListenPlaylist()}
          onRemoveFromLibrary={() =>
            handleDeleteFromMediaLibrary(albumData?.album.id as string)
          }
          onAddToLibrary={() =>
            handleAddToMediaLibrary(albumData?.album.id as string)
          }
          onOpenMenu={() => setMenuModal((prev) => !prev)}
          onOpenFormatModal={() => setChangeFormatModal((prev) => !prev)}
        />
      </div>
      <div className="px-7">
        <Table tracks={albumData.album.tracks.items} album={albumData.album} withoutAlbumLink={true} />
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
