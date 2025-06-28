import { Footer } from "@widgets/footer/ui/Footer";
import { UserInfo } from "@widgets/user-info/ui/UserInfo";

export const UserPage = () => {
  return (
    <div className="flex flex-col gap-20 bg-[#141414] w-full h-[83vh] overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-xl relative">
      <UserInfo />
      <div className="px-3">
        <Footer />
      </div>
    </div>
  );
};

export default UserPage;
