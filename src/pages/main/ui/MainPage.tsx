import { NewReleasesList } from "../../../widgets/new-releases/ui/NewReleasesList";
import { PopularArtistsList } from "../../../widgets/popular-artists/ui/PopularArtistsList";
import { PopularTracksList } from "../../../widgets/popular-tracks/ui/PopularTracksList";

export const MainPage = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-zinc-800 via-zinc-900 to-neutral-900 flex flex-col px-12 py-5 rounded-xl">
        <PopularTracksList />
        <PopularArtistsList />
        <NewReleasesList />
      </div>
    </>
  );
};
