import { useRef, useState } from "react";
import { Discography } from "@widgets/discography/ui/Discography";
import { Footer } from "@widgets/footer/ui/Footer";
import { PageLayout } from "@shared/ui/page-layout/PageLayout";

const DiscographyPage = () => {
  const [isFilterDropDownOpen, setIsFilterDropDownOpen] = useState(false);
  const [isSortDropDownOpen, setIsSortDropDownOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <PageLayout
      scrollContainerRef={scrollContainerRef}
      isFilterDropDownOpen={isFilterDropDownOpen}
      isSortDropDownOpen={isSortDropDownOpen}
    >
      <Discography
        setIsFilterDropDownOpen={setIsFilterDropDownOpen}
        setIsSortDropDownOpen={setIsSortDropDownOpen}
        scrollContainerRef={scrollContainerRef}
      />
      <Footer />
    </PageLayout>
  );
};

export default DiscographyPage;
