import { PageLayout } from "@shared/ui/page-layout/PageLayout";
import { ArtistInfo } from "@widgets/artist-info/ui/ArtistInfo";
import { Footer } from "@widgets/footer/ui/Footer";

const ArtistPage = () => {
  return (
    <PageLayout>
      <ArtistInfo />
      <Footer />
    </PageLayout>
  );
};

export default ArtistPage;
