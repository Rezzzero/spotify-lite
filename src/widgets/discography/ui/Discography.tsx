import { TrackCard } from "../../../shared/ui/track-card/TrackCard";
import { useDiscography } from "../model/useDiscography";
import { Link } from "react-router-dom";
import clockIcon from "../../../shared/assets/clock-icon.svg";

export const Discography = () => {
  const { discography } = useDiscography();

  if (!discography) return <div>Загрузка...</div>;

  return (
    <>
      <div className="sticky top-0 left-0 w-full px-5 py-3 bg-[#141414] z-10 text-white">
        <Link
          to={`/artist/${discography[0].artists[0].id}`}
          className="font-bold text-xl hover:underline"
        >
          {discography[0].artists[0].name}
        </Link>
      </div>
      <div className="flex flex-col gap-10 px-5">
        {discography.map((album) => (
          <div key={album.id} className="flex flex-col gap-5">
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
    </>
  );
};
