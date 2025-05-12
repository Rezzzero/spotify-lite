import { Link } from "react-router-dom";
import { useSearchResults } from "../model/useSearchResults";
import { formatMsToMinutesAndSeconds } from "../../../shared/lib/format/msToMinutes";
import { Card } from "../../../shared/ui/card/Card";

export const SearchResults = () => {
  const { searchResults, FiltersList, selectedFilter, handleSelectFilter } =
    useSearchResults();
  const bestResult = searchResults?.tracks?.items?.[0];

  if (!bestResult) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="sticky top-0 left-0 bg-[#141414] flex gap-3 px-4 py-3 rounded-t-xl">
        {Object.keys(FiltersList).map((filter) => (
          <button
            key={filter}
            onClick={() => handleSelectFilter(filter)}
            className={`px-3 py-[6px] text-sm font-semibold rounded-full ${
              selectedFilter === filter
                ? "bg-white text-black"
                : "bg-[#29292b] hover:bg-[#333336]"
            } cursor-pointer`}
          >
            {FiltersList[filter]}
          </button>
        ))}
      </div>
      <div className="flex gap-1 w-full">
        <div className=" flex flex-col gap-2 px-3">
          <h2 className="text-2xl font-bold">Лучший результат</h2>
          <div className="flex flex-col items-start bg-[#1b1b1c] w-[400px] hover:bg-[#242425] duration-300 pt-5 pl-5 pr-12 pb-7 rounded-xl cursor-pointer">
            <img
              src={bestResult.album.images[0].url}
              alt={`${bestResult.name} image`}
              className="w-24 h-24 rounded-md mb-5"
            />
            <Link
              to={`/track/${bestResult.id}`}
              className="text-4xl font-bold hover:underline"
            >
              {bestResult.name}
            </Link>
            <p>
              <span className="text-gray-400 text-sm">Трек </span>
              <span className="text-gray-400 font-bold">·</span>{" "}
              {bestResult.artists[0].name}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Link to="/" className="text-2xl font-bold hover:underline">
            Треки
          </Link>
          <div className="flex flex-col">
            {searchResults?.tracks?.items?.slice(0, 4).map((track, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-2 py-[6px] pr-6 rounded-md hover:bg-[#333336]"
              >
                <img
                  src={track.album.images[0].url}
                  alt={`${track.name} image`}
                  className="w-10 h-10 rounded-md"
                />
                <div>
                  <Link to={`/track/${track.id}`} className="hover:underline">
                    {track.name}
                  </Link>
                  <div className="flex text-gray-400 flex-wrap">
                    {track.artists.map((artist, index) => (
                      <div key={artist.id} className="flex items-center">
                        <Link
                          to={`/artist/${artist.id}`}
                          className="text-sm font-semibold hover:underline"
                        >
                          {artist.name}
                        </Link>
                        {index < track.artists.length - 1 && (
                          <span>,&nbsp;</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 ml-auto">
                  {formatMsToMinutesAndSeconds(track.duration_ms)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Link to={"/"} className="text-2xl font-bold px-3 hover:underline">
          Исполнители
        </Link>
        <div className="flex">
          {searchResults?.artists?.items?.slice(0, 8).map((artist, index) => (
            <Card
              key={index}
              image={artist.images[0].url}
              name={artist.name}
              link={`/artist/${artist.id}`}
              isRoundedFull={true}
              isSearchPage={true}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Link to={"/"} className="text-2xl font-bold px-3 hover:underline">
          Альбомы
        </Link>
        <div className="flex">
          {searchResults?.albums?.items?.slice(0, 8).map((album, index) => (
            <Card
              key={index}
              image={album.images[0].url}
              name={album.name}
              link={`/album/${album.id}`}
              isSearchPage={true}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Link to={"/"} className="text-2xl font-bold px-3 hover:underline">
          Плейлисты
        </Link>
        <div className="flex">
          {searchResults?.playlists?.items
            .filter((playlist) => playlist !== null)
            .slice(0, 8)
            .map((playlist, index) => (
              <Card
                key={index}
                image={playlist.images[0].url}
                name={playlist.name}
                link={`/playlist/${playlist.id}`}
                isSearchPage={true}
              />
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Link to={"/"} className="text-2xl font-bold px-3 hover:underline">
          Подкасты
        </Link>
        <div className="flex">
          {searchResults?.shows?.items?.slice(0, 8).map((show, index) => (
            <Card
              key={index}
              image={show.images[0].url}
              name={show.name}
              link={`/show/${show.id}`}
              isSearchPage={true}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Link to={"/"} className="text-2xl font-bold px-3 hover:underline">
          Выпуски
        </Link>
        <div className="flex">
          {searchResults?.episodes?.items?.slice(0, 8).map((episode, index) => (
            <Card
              key={index}
              image={episode.images[0].url}
              name={episode.name}
              link={`/episode/${episode.id}`}
              isSearchPage={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
