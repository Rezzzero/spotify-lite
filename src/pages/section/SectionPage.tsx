import { Footer } from "@widgets/footer/ui/Footer";
import { SectionList } from "@widgets/section-list/ui/SectionList";

const SectionPage = () => {
  return (
    <div className="flex flex-col pb-4 pl-3 pr-5 bg-[#141414] w-[80%] h-[83vh] overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-xl relative">
      <SectionList />
      <Footer />
    </div>
  );
};

export default SectionPage;
