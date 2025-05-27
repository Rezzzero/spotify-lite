export const CustomInput = ({
  type,
  id,
  value,
  onChange,
  onInputBlur,
  placeholder,
  inputBlured,
  valueInvalid,
  showPassword,
}: {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: (value: boolean) => void;
  placeholder: string;
  inputBlured: boolean;
  valueInvalid: boolean;
  showPassword?: boolean;
}) => {
  return (
    <input
      type={showPassword ? "text" : type}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={() => onInputBlur(true)}
      placeholder={placeholder}
      className={`rounded-sm w-full py-3 px-4 outline-none border mb-5 ${
        inputBlured && valueInvalid
          ? "border-red-500"
          : "border-zinc-500 hover:border-white focus:border-white focus:shadow-[0_0_0_1px_white]"
      }`}
    />
  );
};
