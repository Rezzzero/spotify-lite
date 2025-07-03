import { AlbumInfo } from "@widgets/album-info/ui/AlbumInfo";
import { Footer } from "@widgets/footer/ui/Footer";

const AlbumPage = () => {
  return (
    <div className="flex flex-col gap-20 bg-[#141414] w-full h-[83vh] overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-xl relative">
      <AlbumInfo />
      <Footer />
    </div>
  );
};

export default AlbumPage;
