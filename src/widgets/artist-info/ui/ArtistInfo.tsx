import { Link } from "react-router-dom";
import { CardList } from "@shared/ui/card-list/CardList";
import { useArtistInfo } from "../model/useArtistInfo";
import { artistMusicFilterList } from "@shared/constants/constants";
import { Loader } from "@shared/ui/loader/Loader";
import { ArtistInfoTrackCard } from "../artist-info-track-card/ui/ArtistInfoTrackCard";

export const ArtistInfo = () => {
  const {
    artistInfo,
    imageColors,
    handleChangeFilter,
    selectedFilter,
    filtredAlbumsAndSingles,
    loading,
    playlists,
    user,
  } = useArtistInfo();
  if (loading || !artistInfo)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  const headerGradient = imageColors
    ? `linear-gradient(to bottom, ${imageColors[0]}, ${imageColors[1]})`
    : "linear-gradient(to bottom, #333, #222)";

  return (
    <div className="flex flex-col gap-15">
      <div
        style={{ background: headerGradient }}
        className="flex items-center gap-7 p-7"
      >
        <img
          src={artistInfo.artist.images[0].url}
          alt={artistInfo.artist.name + " image"}
          className="rounded-full w-[232px] h-[232px] shadow-[0px_7px_58px_-2px_rgba(0,_0,_0,_0.6)]"
        />
        <h2 className="text-[100px] font-bold">{artistInfo.artist.name}</h2>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h2 className="text-2xl font-bold">Популярные треки</h2>
        <div className="flex flex-col w-[70%]">
          {artistInfo.topTracks.map((track, index) => (
            <ArtistInfoTrackCard
              key={track.id}
              track={track}
              index={index}
              isOwner={false}
              format="list"
              withImage={true}
              playlists={playlists}
              userId={user?.user?.id}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 px-3">
        <div className="flex justify-between pl-2 px-3">
          <Link
            to={`/artist/${artistInfo.artist.id}/discography/${selectedFilter}`}
            className="text-2xl font-bold hover:underline"
          >
            Музыка
          </Link>
          <Link
            to={`/artist/${artistInfo.artist.id}/discography/${selectedFilter}`}
            className="text-[#bababa] font-bold text-sm hover:underline"
          >
            Показать все
          </Link>
        </div>
        <div className="flex gap-2 px-2">
          {Object.values(artistMusicFilterList).map(
            (filter: { name: string; path: string }) => (
              <button
                key={filter.name}
                type="button"
                className={`px-3 py-1 rounded-full ${
                  selectedFilter === filter.path
                    ? "bg-white text-black"
                    : "bg-[#29292b] hover:bg-[#333336]"
                } cursor-pointer`}
                onClick={() => handleChangeFilter(filter.path)}
              >
                {filter.name}
              </button>
            )
          )}
        </div>
        <CardList
          items={filtredAlbumsAndSingles.slice(0, 8)}
          itemType="album"
        />
      </div>
      <div className="flex flex-col gap-3 px-3">
        <div className="flex justify-between pl-2 px-3">
          <h2 className="text-2xl font-bold">В плейлистах и альбомах</h2>
          <Link
            to={`/artist/${artistInfo.artist.id}/discovered-on`}
            className="text-[#bababa] font-bold text-sm hover:underline"
          >
            Показать все
          </Link>
        </div>
        <CardList
          items={artistInfo.playlists
            .filter((playlist) => playlist !== null)
            .slice(0, 8)}
          itemType="playlist"
        />
      </div>
      {artistInfo.otherArtists.length > 0 && (
        <div className="flex flex-col gap-2 px-3">
          <h2 className="text-2xl font-bold px-2">Коллаборации с артистами</h2>
          <CardList
            items={artistInfo.otherArtists.slice(0, 8)}
            itemType="artist"
          />
        </div>
      )}
      {artistInfo.moreWithArtist.length > 0 && (
        <div className="flex flex-col gap-2 px-3">
          <h2 className="text-2xl font-bold px-2">Ещё с этим исполнителем</h2>
          <CardList
            items={artistInfo.moreWithArtist.slice(0, 8)}
            itemType="album"
          />
        </div>
      )}
    </div>
  );
};
