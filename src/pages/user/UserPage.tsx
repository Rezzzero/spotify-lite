import { PageLayout } from "@shared/ui/page-layout/PageLayout";
import { Footer } from "@widgets/footer/ui/Footer";
import { UserInfo } from "@widgets/user-info/ui/UserInfo";

export const UserPage = () => {
  return (
    <PageLayout>
      <UserInfo />
      <div className="px-3">
        <Footer />
      </div>
    </PageLayout>
  );
};

export default UserPage;
