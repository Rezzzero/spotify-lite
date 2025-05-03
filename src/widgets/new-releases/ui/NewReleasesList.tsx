import { useNewReleases } from "../model/useNewReleases";

export const NewReleasesList = () => {
  const { releases } = useNewReleases();
  return (
    <div>
      <h2>Новые релизы</h2>
      <div className="flex gap-4">
        {releases.slice(0, 20).map((release, index) => (
          <div key={index} className="flex flex-col gap-3">
            <img src={release.images[0].url} alt={`${release.name} image`} />
            <span>{release.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
