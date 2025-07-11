import { Link } from "react-router-dom";
import { formatMsToMinutesAndSeconds } from "@shared/lib/format/msToMinutesAndSeconds";
import { useTrackInfo } from "../model/useTrackInfo";
import { CardList } from "@shared/ui/card-list/CardList";
import { truncateText } from "@shared/lib/format/truncateText";
import { Loader } from "@shared/ui/loader/Loader";
import { TrackInfoTrackCard } from "../track-info-track-card/ui/TrackInfoTrackCard";

export const TrackInfo = () => {
  const { trackData, albums, singles, imageColors, loading } = useTrackInfo();
  if (loading || !trackData)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  const headerGradient = imageColors
    ? `linear-gradient(to bottom, ${imageColors[0]}, ${imageColors[1]})`
    : "linear-gradient(to bottom, #333, #222)";
  const duration = formatMsToMinutesAndSeconds(trackData.track.duration_ms);
  const releaseYear = trackData.track.album.release_date.split("-")[0];

  return (
    <div className="flex flex-col gap-15">
      <div
        style={{ background: headerGradient }}
        className="flex items-center gap-7 p-7"
      >
        <img
          src={trackData.track.album.images[0].url}
          alt={trackData.track.name + " image"}
          className="rounded-md w-[232px] h-[232px] shadow-[0px_7px_58px_-2px_rgba(0,_0,_0,_0.6)]"
        />
        <div className="flex flex-col h-full pt-17 gap-2">
          <p>Трек</p>
          <h2 className="text-[70px] font-bold leading-none mb-auto">
            {truncateText(trackData.track.name, 30)}
          </h2>
          <div className="flex items-center">
            <img
              src={trackData.artist.images[2].url}
              alt={`${trackData.artist.name} image`}
              className="w-6 h-6 rounded-full mr-1"
            />
            <Link
              to={`/artist/${trackData.artist.id}`}
              className="text-sm font-bold hover:underline"
            >
              {trackData.artist.name}
            </Link>
            <p className="font-semibold text-sm leading-none pb-1">
              <span className="text-xl opacity-70 font-bold relative top-[1px] mx-1">
                ·
              </span>
              <Link to={`/album/${trackData.track.album.id}`}>
                {trackData.track.album.name}
              </Link>
              <span className="text-xl opacity-70 font-bold relative top-[1px] mx-1">
                ·
              </span>
              <span className="opacity-70">{releaseYear}</span>
              <span className="text-xl opacity-70 font-bold relative top-[1px] mx-1">
                ·
              </span>
              <span className="opacity-70">{duration}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-7">
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
