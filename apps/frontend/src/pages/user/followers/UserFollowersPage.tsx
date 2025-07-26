import { PageLayout } from "@shared/ui/page-layout/PageLayout";
import { Footer } from "@widgets/footer/ui/Footer";
import { FollowersInfo } from "@widgets/user-info/followers/ui/FollowersInfo";

const UserFollowersPage = () => {
  return (
    <PageLayout>
      <FollowersInfo />
      <Footer />
    </PageLayout>
  );
};

export default UserFollowersPage;
