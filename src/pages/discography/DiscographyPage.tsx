import { useState } from "react";
import { Discography } from "../../widgets/discography/ui/Discography";
import { Footer } from "../../widgets/footer/ui/Footer";

export const DiscographyPage = () => {
  const [isFilterDropDownOpen, setIsFilterDropDownOpen] = useState(false);
  const [isSortDropDownOpen, setIsSortDropDownOpen] = useState(false);

  return (
    <div
      className={`flex flex-col gap-20 bg-[#141414] w-[80%] h-[85vh] rounded-xl relative [&::-webkit-scrollbar]:hidden ${
        isFilterDropDownOpen || isSortDropDownOpen
          ? "overflow-hidden"
          : "overflow-y-auto"
      }`}
    >
      <Discography
        setIsFilterDropDownOpen={setIsFilterDropDownOpen}
        setIsSortDropDownOpen={setIsSortDropDownOpen}
      />
      <Footer />
    </div>
  );
};
