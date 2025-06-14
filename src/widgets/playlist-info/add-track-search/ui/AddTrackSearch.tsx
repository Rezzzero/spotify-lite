import SearchIcon from "@shared/assets/search-icon.svg?react";
import CrossIcon from "@shared/assets/cross-icon.svg?react";
import ShowAllIcon from "@shared/assets/arrow-next.svg?react";
import HideAllIcon from "@shared/assets/arrow-prev.svg?react";
import { useAddTrackSearch } from "../model/useAddTrackSearch";
import { PlaylistSearchCard } from "@shared/ui/playlist-search-card/PlaylistSearchCard";
import { Track } from "@shared/types/types";

const showAllList = [
  {
    title: "Все исполнители",
  },
  {
    title: "Все треки",
  },
  {
    title: "Все альбомы",
  },
];

export const AddTrackSearch = ({
  closeSearch,
  setTracks,
}: {
  closeSearch: () => void;
  setTracks: (tracks: Track[] | ((prevTracks: Track[]) => Track[])) => void;
}) => {
  const { value, setValue, results, showAll, setShowAll, handleAddTrack } =
    useAddTrackSearch({ setTracks });

  return (
    <>
      <div className="flex items-center justify-between pr-2 pt-5 border-t border-zinc-700">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">
            Давай добавим что-нибудь в твой плейлист
          </h2>
          <div className="relative bg-zinc-700 mt-5 rounded-sm p-2 pl-8">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Поиск треков"
              className="bg-transparent w-full outline-none placeholder:text-gray-300 pr-10"
            />
            <SearchIcon className="absolute top-1/2 transform -translate-y-1/2 left-2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <button type="button" onClick={() => closeSearch()}>
          <CrossIcon className="text-gray-400 w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {showAll === "" && Object.keys(results).length > 0 && (
          <>
            <div>
              {results.tracks && (
                <PlaylistSearchCard
                  data={results.tracks.items[0]}
                  handleAddTrack={handleAddTrack}
                />
              )}
              {results.artists && (
                <PlaylistSearchCard data={results.artists.items[0]} />
              )}
              {results.albums &&
                results.albums.items
                  .slice(0, 3)
                  .map((album) => (
                    <PlaylistSearchCard key={album.id} data={album} />
                  ))}
            </div>
            <div className="flex flex-col gap-1">
              {showAllList.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setShowAll(item.title)}
                  className="flex justify-between items-center hover:bg-zinc-800 p-4 rounded-md"
                >
                  <h1 className="font-bold">{item.title}</h1>
                  <ShowAllIcon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </>
        )}
        {showAll !== "" && (
          <>
            <button
              type="button"
              onClick={() => setShowAll("")}
              className="flex items-center gap-3 my-3"
            >
              <HideAllIcon className="w-5 h-5" />
              <h1 className="font-bold">{showAll}</h1>
            </button>
            <div className="flex flex-col gap-1">
              {showAll === "Все исполнители" &&
                results.artists.items
                  .slice(0, 10)
                  .map((item) => <PlaylistSearchCard data={item} />)}
              {showAll === "Все треки" &&
                results.tracks.items
                  .slice(0, 10)
                  .map((item) => <PlaylistSearchCard data={item} />)}
              {showAll === "Все альбомы" &&
                results.albums.items
                  .slice(0, 8)
                  .map((item) => <PlaylistSearchCard data={item} />)}
            </div>
          </>
        )}
      </div>
    </>
  );
};
