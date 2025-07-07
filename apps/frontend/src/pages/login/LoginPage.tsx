import { LoginForm } from "@features/auth/login-form/ui/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-b from-zinc-800 via-zinc-950 to-zinc-black pt-10">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
