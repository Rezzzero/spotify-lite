import { AlbumInfo } from "@widgets/album-info/ui/AlbumInfo";
import { Footer } from "@widgets/footer/ui/Footer";

export const AlbumPage = () => {
  return (
    <div className="flex flex-col gap-20 bg-[#141414] w-[80%] h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-xl relative">
      <AlbumInfo />
      <Footer />
    </div>
  );
};
