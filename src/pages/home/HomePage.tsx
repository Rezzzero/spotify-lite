import { Footer } from "../../widgets/footer/ui/Footer";
import { NewReleasesList } from "../../widgets/new-releases/ui/NewReleasesList";
import { PopularArtistsList } from "../../widgets/popular-artists/ui/PopularArtistsList";
import { PopularTracksList } from "../../widgets/popular-tracks/ui/PopularTracksList";

export const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-[#1d1e1f] via-[#080808] to-[#080808] flex flex-col py-7 gap-8 h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden w-[80%] ml-auto rounded-xl">
      <PopularTracksList />
      <PopularArtistsList />
      <NewReleasesList />
      <div className="px-5">
        <Footer />
      </div>
    </div>
  );
};
