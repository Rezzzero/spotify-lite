import { Discography } from "../../widgets/discography/ui/Discography";
import { Footer } from "../../widgets/footer/ui/Footer";

export const DiscographyPage = () => {
  return (
    <div className="flex flex-col gap-20 bg-[#141414] w-[80%] h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-xl relative">
      <Discography />
      <Footer />
    </div>
  );
};
