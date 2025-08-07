import { APP_NAME } from "@config/app.config";
import { handleChangeTitle } from "@shared/lib/utils/handleChangeTitle";
import { Footer } from "@widgets/footer/ui/Footer";
import { NewReleasesList } from "@widgets/new-releases/ui/NewReleasesList";
import { PopularArtistsList } from "@widgets/popular-artists/ui/PopularArtistsList";
import { PopularTracksList } from "@widgets/popular-tracks/ui/PopularTracksList";

const HomePage = () => {
  handleChangeTitle(`${APP_NAME} - Web Player: Music for everyone`);
  return (
    <div className="bg-gradient-to-b from-[#1d1e1f] via-[#080808] to-[#080808] flex flex-col page-content py-7 gap-8 h-[83vh] overflow-y-auto [&::-webkit-scrollbar]:hidden w-full rounded-xl">
      <PopularTracksList />
      <PopularArtistsList />
      <NewReleasesList />
      <div className="px-5">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
