import SearchIcon from "@shared/assets/search-icon.svg?react";
import CrossIcon from "@shared/assets/cross-icon.svg?react";
import ShowAllIcon from "@shared/assets/arrow-next.svg?react";
import HideAllIcon from "@shared/assets/arrow-prev.svg?react";
import { useAddTrackSearch } from "../model/useAddTrackSearch";
import { PlaylistSearchCard } from "@shared/ui/playlist-search-card/PlaylistSearchCard";
import { SearchResults, TablesTrack } from "@shared/types/types";

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
  handleUpdateDuration,
}: {
  closeSearch: () => void;
  setTracks: (
    tracks: TablesTrack[] | ((prevTracks: TablesTrack[]) => TablesTrack[])
  ) => void;
  handleUpdateDuration: (trackDuration: number, isAdd: boolean) => void;
}) => {
  const {
    value,
    setValue,
    results,
    setResults,
    showAll,
    setShowAll,
    handleAddTrack,
    handleGetArtistTopTracksAndAlbums,
    artistTopTracks,
    artistAlbums,
    showTracksAndAlbums,
    setShowTracksAndAlbums,
    showAlbum,
    setShowAlbum,
    album,
    handleGetAlbumTracks,
  } = useAddTrackSearch({ setTracks, handleUpdateDuration });

  const shouldShowSearchResults =
    showAll === "" &&
    Object.keys(results).length > 0 &&
    !showTracksAndAlbums &&
    !showAlbum;
  const shouldShowAllResults = showAll !== "" && !showTracksAndAlbums;
  const shouldShowArtistContent = showTracksAndAlbums;
  const shouldShowAlbumContent = album !== null && showAlbum;

  return (
    <>
      <div className="flex items-center justify-between pr-2 pt-5 border-t border-zinc-700">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">
            Давай добавим что-нибудь в твой плейлист
          </h2>
          <div className="relative bg-zinc-700 mt-5 rounded-sm p-2 pl-8">
            <input
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Поиск треков"
              className="bg-transparent w-full outline-none placeholder:text-gray-300 pr-10 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden"
            />
            <SearchIcon className="absolute top-1/2 transform -translate-y-1/2 left-2 w-5 h-5 text-gray-400" />
            {value.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setValue("");
                  setResults({} as SearchResults);
                }}
                className="absolute top-1/2 transform -translate-y-1/2 right-2"
              >
                <CrossIcon className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
        <button type="button" onClick={() => closeSearch()}>
          <CrossIcon className="text-gray-400 w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {shouldShowSearchResults && (
          <>
            <div>
              {results.artists && (
                <PlaylistSearchCard
                  data={results.artists.items[0]}
                  handleShowArtist={handleGetArtistTopTracksAndAlbums}
                />
              )}
              {results.tracks &&
                results.tracks.items
                  .slice(0, 6)
                  .map((track) => (
                    <PlaylistSearchCard
                      key={track.id}
                      data={track}
                      handleAddTrack={handleAddTrack}
                    />
                  ))}
              {results.albums && (
                <PlaylistSearchCard
                  data={results.albums.items[0]}
                  handleShowAlbum={handleGetAlbumTracks}
                />
              )}
              {results.tracks && (
                <PlaylistSearchCard
                  data={results.tracks.items[6]}
                  handleAddTrack={handleAddTrack}
                />
              )}
              {results.albums && (
                <PlaylistSearchCard data={results.albums.items[1]} />
              )}
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
        {shouldShowAllResults && (
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
                  .map((item) => (
                    <PlaylistSearchCard
                      key={item.id}
                      data={item}
                      handleShowArtist={handleGetArtistTopTracksAndAlbums}
                    />
                  ))}
              {showAll === "Все треки" &&
                results.tracks.items
                  .slice(0, 10)
                  .map((item) => (
                    <PlaylistSearchCard
                      key={item.id}
                      data={item}
                      handleAddTrack={handleAddTrack}
                    />
                  ))}
              {showAll === "Все альбомы" &&
                results.albums.items
                  .slice(0, 8)
                  .map((item) => (
                    <PlaylistSearchCard
                      key={item.id}
                      data={item}
                      handleShowAlbum={handleGetAlbumTracks}
                    />
                  ))}
            </div>
          </>
        )}
        {shouldShowArtistContent && (
          <>
            <button
              type="button"
              onClick={() => setShowTracksAndAlbums(false)}
              className="flex items-center gap-3 my-3"
            >
              <HideAllIcon className="w-5 h-5" />
              <h1 className="font-bold">{results.artists.items[0].name}</h1>
            </button>
            <div className="flex flex-col gap-1 mb-2">
              <h1 className="font-bold">Популярные треки</h1>
              {artistTopTracks.map((item) => (
                <PlaylistSearchCard
                  key={item.id}
                  data={item}
                  handleAddTrack={handleAddTrack}
                />
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold">Альбомы</h1>
              {artistAlbums.slice(0, 20).map((item) => (
                <PlaylistSearchCard
                  key={item.id}
                  data={item}
                  handleShowAlbum={handleGetAlbumTracks}
                />
              ))}
            </div>
          </>
        )}
        {shouldShowAlbumContent && (
          <>
            <button
              type="button"
              onClick={() => setShowAlbum(false)}
              className="flex items-center gap-3 my-3"
            >
              <HideAllIcon className="w-5 h-5" />
              <h1 className="font-bold">{album.name}</h1>
            </button>
            <div className="flex flex-col gap-1 mb-2">
              {album.tracks.items.map((item) => (
                <PlaylistSearchCard
                  key={item.id}
                  data={item}
                  handleAddTrack={handleAddTrack}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
