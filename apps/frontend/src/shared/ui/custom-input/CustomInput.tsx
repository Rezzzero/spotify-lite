import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export const CustomInput = ({
  type,
  id,
  error,
  register,
  placeholder,
  showPassword,
}: {
  type: string;
  id: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn;
  placeholder: string;
  showPassword?: boolean;
}) => {
  return (
    <input
      type={showPassword ? "text" : type}
      id={id}
      placeholder={placeholder}
      {...register}
      className={`no-spinner rounded-sm w-full py-3 px-4 mt-1 outline-none font-normal border ${
        error
          ? "border-red-500"
          : "border-zinc-500 hover:border-white focus:border-white focus:shadow-[0_0_0_1px_white]"
      }`}
    />
  );
};
