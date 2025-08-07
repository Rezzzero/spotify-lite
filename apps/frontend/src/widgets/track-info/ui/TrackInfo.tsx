import { Link } from "react-router-dom";
import { useTrackInfo } from "../model/useTrackInfo";
import { CardList } from "@shared/ui/card-list/CardList";
import { truncateText } from "@shared/lib/format/truncateText";
import { Loader } from "@shared/ui/loader/Loader";
import { TrackInfoTrackCard } from "../track-info-track-card/ui/TrackInfoTrackCard";
import { MediaHeader } from "@shared/ui/media-header/MediaHeader";
import { MediaControls } from "@features/media-controls/ui/MediaControls";
import { Popper } from "@mui/material";
import { MediaMenu } from "@features/media-menu/ui/MediaMenu";
import { handleChangeTitle } from "@shared/lib/utils/handleChangeTitle";
import { APP_NAME } from "@config/app.config";

export const TrackInfo = () => {
  const {
    trackData,
    albums,
    singles,
    imageColors,
    loading,
    menuModal,
    setMenuModal,
    menuAnchor,
    menuModalRef,
    menuButtonRef,
    isPlaying,
    handleListenPlaylist,
    handleOpenMenu,
  } = useTrackInfo();
  if (loading || !trackData)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  handleChangeTitle(
    `${trackData.track.name} - song and lyrics by ${trackData.artist.name} | ${APP_NAME}`
  );

  const releaseYear = trackData.track.album.release_date.split("-")[0];

  return (
    <div className="flex flex-col">
      <MediaHeader
        imageColors={imageColors}
        mainImage={trackData.track.album.images[0].url}
        mainName={truncateText(trackData.track.name, 30)}
        ownerImage={trackData.artist.images[2].url}
        ownerName={trackData.artist.name}
        link={`/artist/${trackData.artist.id}`}
        releaseYear={releaseYear}
        duration={trackData.track.duration_ms}
        albumName={trackData.track.album.name}
        albumLink={`/album/${trackData.track.album.id}`}
      />
      <div className="flex flex-col gap-3 px-7">
        <MediaControls
          isOwner={false}
          isPlaying={isPlaying}
          mediaId={trackData.track.id}
          mediaName={trackData.track.name}
          tracks={trackData.topTracks}
          menuButtonRef={menuButtonRef}
          onPlay={() => handleListenPlaylist()}
          onOpenMenu={(e) => handleOpenMenu(e)}
          type="track"
        />
        <Popper open={menuModal} anchorEl={menuAnchor} placement="bottom-start">
          <MediaMenu
            menuRef={menuModalRef}
            closeMenu={() => setMenuModal(false)}
            mediaType="track"
            track={trackData.track}
            openedFromMediaLibary={false}
          />
        </Popper>
        <p className="text-[14px] font-semibold text-zinc-400">
          Популярные треки исполнителя
        </p>
        <h2 className="text-2xl font-bold">{trackData.artist.name}</h2>
        <div className="flex flex-col">
          {trackData.topTracks.map((track, index) => (
            <TrackInfoTrackCard key={track.id} track={track} index={index} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 px-3">
        <div className="flex justify-between px-3">
          <Link
            to={`/artist/${trackData.artist.id}/discography/album`}
            className="text-2xl font-bold hover:underline"
          >
            {trackData.artist.name}: популярные альбомы
          </Link>
          <Link
            to={`/artist/${trackData.artist.id}/discography/album`}
            className="text-[#bababa] text-sm font-bold hover:underline"
          >
            Показать все
          </Link>
        </div>
        <CardList items={albums.slice(0, 8)} itemType="album" />
      </div>
      <div className="flex flex-col gap-3 px-3">
        <div className="flex justify-between px-3">
          <Link
            to={`/artist/${trackData.artist.id}/discography/single`}
            className="text-2xl font-bold hover:underline"
          >
            {trackData.artist.name}: популярные синглы
          </Link>
          <Link
            to={`/artist/${trackData.artist.id}/discography/single`}
            className="text-[#bababa] text-sm font-bold hover:underline"
          >
            Показать все
          </Link>
        </div>
        <CardList items={singles.slice(0, 8)} itemType="album" />
      </div>
    </div>
  );
};
