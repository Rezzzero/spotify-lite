import { PageLayout } from "@shared/ui/page-layout/PageLayout";
import { AlbumInfo } from "@widgets/album-info/ui/AlbumInfo";
import { Footer } from "@widgets/footer/ui/Footer";

const AlbumPage = () => {
  return (
    <PageLayout>
      <AlbumInfo />
      <Footer />
    </PageLayout>
  );
};

export default AlbumPage;
