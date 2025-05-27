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
  stepError,
}: {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: () => void;
  placeholder: string;
  inputBlured: boolean;
  valueInvalid: boolean;
  showPassword?: boolean;
  stepError: boolean;
}) => {
  return (
    <input
      type={showPassword ? "text" : type}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={() => onInputBlur()}
      placeholder={placeholder}
      className={`rounded-sm w-full py-3 px-4 mt-1 outline-none font-normal border ${
        (inputBlured && valueInvalid) || stepError
          ? "border-red-500"
          : "border-zinc-500 hover:border-white focus:border-white focus:shadow-[0_0_0_1px_white]"
      }`}
    />
  );
};
