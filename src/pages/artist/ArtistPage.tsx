import { ArtistInfo } from "@widgets/artist-info/ui/ArtistInfo";
import { Footer } from "@widgets/footer/ui/Footer";

const ArtistPage = () => {
  return (
    <div className="flex flex-col gap-20 bg-[#141414] w-full h-[83vh] overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-xl relative">
      <ArtistInfo />
      <Footer />
    </div>
  );
};

export default ArtistPage;
