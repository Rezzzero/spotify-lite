import { Link } from "react-router-dom";
import { useSearchResults } from "../model/useSearchResults";
import { CardList } from "@shared/ui/card-list/CardList";
import { Loader } from "@shared/ui/loader/Loader";
import { ResultsTrackCard } from "../results-track-card/ui/ResultsTrackCard";

export const SearchResults = () => {
  const { searchResults, loading } = useSearchResults();
  const bestResult = searchResults?.tracks?.items?.[0];
  if (!searchResults || loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full mb-10">
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
            {searchResults?.tracks?.items?.slice(0, 4).map((track) => (
              <ResultsTrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      </div>
      <CardList
        title={"Исполнители"}
        titleLink={"/"}
        items={searchResults.artists.items.slice(0, 8)}
        itemType={"artist"}
        isSearchPage
      />
      <CardList
        title={"Альбомы"}
        titleLink={"/"}
        items={searchResults.albums.items.slice(0, 8)}
        itemType={"album"}
        isSearchPage
      />
      <CardList
        title={"Плейлисты"}
        titleLink={"/"}
        items={searchResults.playlists.items
          .filter((playlist) => playlist !== null)
          .slice(0, 8)}
        itemType={"playlist"}
        isSearchPage
      />
      <CardList
        title={"Подкасты"}
        titleLink={"/"}
        items={searchResults.shows.items.slice(0, 8)}
        itemType={"show"}
        isSearchPage
      />
      <CardList
        title={"Выпуски"}
        titleLink={"/"}
        items={searchResults.episodes.items.slice(0, 8)}
        itemType={"episode"}
        isSearchPage
      />
    </div>
  );
};
