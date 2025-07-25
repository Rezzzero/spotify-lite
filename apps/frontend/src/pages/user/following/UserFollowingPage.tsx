import { PageLayout } from "@shared/ui/page-layout/PageLayout";
import { Footer } from "@widgets/footer/ui/Footer";
import { FollowingInfo } from "@widgets/user-info/following/ui/FollowingInfo";

const UserFollowingPage = () => {
  return (
    <PageLayout>
      <FollowingInfo />
      <Footer />
    </PageLayout>
  );
};

export default UserFollowingPage;
