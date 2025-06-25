import { Footer } from "@widgets/footer/ui/Footer";
import { PlaylistInfo } from "@widgets/playlist-info/ui/PlaylistInfo";

const PlaylistPage = () => {
  return (
    <div className="flex flex-col gap-20 bg-[#141414] w-full h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-xl relative">
      <PlaylistInfo />
      <div className="px-3">
        <Footer />
      </div>
    </div>
  );
};

export default PlaylistPage;
