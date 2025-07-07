import { PageLayout } from "@shared/ui/page-layout/PageLayout";
import { Footer } from "@widgets/footer/ui/Footer";
import { TrackInfo } from "@widgets/track-info/ui/TrackInfo";

const TrackPage = () => {
  return (
    <PageLayout>
      <TrackInfo />
      <Footer />
    </PageLayout>
  );
};

export default TrackPage;
