import { PageLayout } from "@shared/ui/page-layout/PageLayout";
import { Footer } from "@widgets/footer/ui/Footer";
import { SectionList } from "@widgets/section-list/ui/SectionList";

const SectionPage = () => {
  return (
    <PageLayout isSectionPage={true}>
      <SectionList />
      <Footer />
    </PageLayout>
  );
};

export default SectionPage;
