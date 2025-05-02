import { usePopularTracks } from "../ui/usePopularTracks";

export const PopularTracksList = () => {
  const { list } = usePopularTracks();
  return (
    <div>
      <div className="flex gap-4">
        {list.slice(0, 20).map((track, index) => (
          <div key={index} className="flex flex-col gap-3">
            <img src={track.track.album.images[0].url} alt="" />
            <span>{track.track.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
