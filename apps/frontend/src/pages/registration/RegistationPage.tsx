import { APP_NAME } from "@config/app.config";
import { RegistrationForm } from "@features/auth/registration-form/ui/RegistrationForm";
import { handleChangeTitle } from "@shared/lib/utils/handleChangeTitle";

const RegistationPage = () => {
  handleChangeTitle(`Зарегистрироваться - ${APP_NAME}`);

  return (
    <div className="flex flex-col items-center bg-[#121212] h-screen pt-10">
      <RegistrationForm />
    </div>
  );
};

export default RegistationPage;
