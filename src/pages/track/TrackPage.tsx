import { Footer } from "@widgets/footer/ui/Footer";
import { TrackInfo } from "@widgets/track-info/ui/TrackInfo";

const TrackPage = () => {
  return (
    <div className="flex flex-col gap-20 bg-[#141414] w-[80%] h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-xl relative">
      <TrackInfo />
      <Footer />
    </div>
  );
};

export default TrackPage;
