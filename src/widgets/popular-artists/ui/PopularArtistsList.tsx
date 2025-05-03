import { usePopularArtists } from "../model/usePopularArtists";

export const PopularArtistsList = () => {
  const { list } = usePopularArtists();
  return (
    <div>
      <h2>Популярные исполнители</h2>
      <div className="flex gap-4">
        {list.slice(0, 20).map((artist, index) => (
          <div key={index} className="flex flex-col gap-3">
            <img src={artist.images[0].url} alt={`${artist.name} image`} />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
