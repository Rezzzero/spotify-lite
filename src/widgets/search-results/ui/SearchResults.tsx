import { Link } from "react-router-dom";
import { useSearchResults } from "../model/useSearchResults";
import { formatMsToMinutesAndSeconds } from "../../../shared/lib/format/msToMinutes";

export const SearchResults = () => {
  const { searchResults, FiltersList, selectedFilter, handleSelectFilter } =
    useSearchResults();
  const bestResult = searchResults?.tracks?.items?.[0];

  if (!bestResult) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex gap-3">
        {Object.keys(FiltersList).map((filter) => (
          <button
            key={filter}
            onClick={() => handleSelectFilter(filter)}
            className={`px-3 py-1 text-sm font-semibold rounded-full ${
              selectedFilter === filter
                ? "bg-white text-black"
                : "bg-[#29292b] hover:bg-[#333336]"
            } cursor-pointer`}
          >
            {FiltersList[filter]}
          </button>
        ))}
      </div>
      <div className="flex gap-2 w-full">
        <div className=" flex flex-col gap-2 cursor-pointer">
          <h2 className="text-2xl font-bold">Лучший результат</h2>
          <div className="flex flex-col items-start bg-[#1b1b1c] w-[400px] hover:bg-[#242425] duration-300 pt-5 pl-5 pr-12 pb-7 rounded-xl">
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
          <h2 className="text-2xl font-bold">Треки</h2>
          <div className="flex flex-col">
            {searchResults?.tracks?.items?.slice(0, 4).map((track, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-2 py-[6px] rounded-md hover:bg-[#333336]"
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
    </div>
  );
};
