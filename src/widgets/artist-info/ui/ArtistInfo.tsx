import { CardList } from "../../../shared/ui/card-list/CardList";
import { TrackCard } from "../../../shared/ui/track-card/TrackCard";
import { useArtistInfo } from "../model/useArtistInfo";

export const ArtistInfo = () => {
  const { artistInfo, imageColors } = useArtistInfo();

  if (!artistInfo || !imageColors) return <div>Загрузка...</div>;
  const headerGradient = `linear-gradient(to bottom, ${imageColors[0]}, ${imageColors[1]})`;

  return (
    <div>
      <div
        style={{ background: headerGradient }}
        className="flex items-center gap-7 p-7"
      >
        <img
          src={artistInfo.artist.images[0].url}
          alt={artistInfo.artist.name + " image"}
          className="rounded-full w-[232px] h-[232px] shadow-2xl"
        />
        <h2 className="text-[100px] font-bold">{artistInfo.artist.name}</h2>
      </div>
      <div className="flex flex-col gap-2 p-7">
        <h2 className="text-3xl font-bold">Популярные треки</h2>
        <div className="flex flex-col w-[70%]">
          {artistInfo.topTracks.map((track, index) => (
            <TrackCard key={track.id} track={track} index={index} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold p-7">Альбомы</h2>
        <CardList items={artistInfo.albums.slice(0, 8)} itemType="albums" />
      </div>
    </div>
  );
};
