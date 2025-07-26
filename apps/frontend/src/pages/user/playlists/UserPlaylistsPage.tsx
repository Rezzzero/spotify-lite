import { PageLayout } from "@shared/ui/page-layout/PageLayout";
import { Footer } from "@widgets/footer/ui/Footer";
import { UserPlaylistsInfo } from "@widgets/user-info/playlists/ui/userPlaylistsInfo";

const UserPlaylistsPage = () => {
  return (
    <PageLayout>
      <UserPlaylistsInfo />
      <Footer />
    </PageLayout>
  );
};

export default UserPlaylistsPage;
