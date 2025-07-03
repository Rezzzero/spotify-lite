import { PageLayout } from "@shared/ui/page-layout/PageLayout";
import { Footer } from "@widgets/footer/ui/Footer";
import { PlaylistInfo } from "@widgets/playlist-info/ui/PlaylistInfo";

const PlaylistPage = () => {
  return (
    <PageLayout>
      <PlaylistInfo />
      <div className="px-3">
        <Footer />
      </div>
    </PageLayout>
  );
};

export default PlaylistPage;
