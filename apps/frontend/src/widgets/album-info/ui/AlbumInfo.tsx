import { Link } from "react-router-dom";
import { useAlbumInfo } from "../model/useAlbumInfo";
import { formatReleaseDate } from "@shared/lib/format/releaseDate";
import { CardList } from "@shared/ui/card-list/CardList";
import { truncateText } from "@shared/lib/format/truncateText";
import { Loader } from "@shared/ui/loader/Loader";
import { MediaControls } from "@features/media-controls/ui/MediaControls";
import { Table } from "@shared/ui/table/Table";
import { TestMediaHeader } from "@shared/ui/test-media-header/TestMediaHeader";
import { MediaHeader } from "@shared/ui/media-header/MediaHeader";

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

  const sumOfDuration = albumData.album.tracks.items.reduce(
    (acc, track) => acc + track.duration_ms,
    0
  );

  const releaseYear = albumData.album.release_date.split("-")[0];
  const totalTracks = albumData.album.tracks.total;

  const format = "compact";

  return (
    <div className="flex flex-col gap-5">
      <MediaHeader
        imageColors={imageColors}
        mainImage={albumData.album.images[0].url}
        mainName={truncateText(albumData.album.name, 30)}
        ownerImage={albumData.artist.images[2].url}
        ownerName={albumData.artist.name}
        totalTracks={totalTracks}
        releaseYear={releaseYear}
        duration={sumOfDuration}
        link={`/artist/${albumData.artist.id}`}
        albumType={albumData.album.album_type}
      />
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
        <Table
          tracks={albumData.album.tracks.items}
          tableKey="withoutAddedAt"
          album={albumData.album}
          withoutAlbumLink={true}
        />
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
