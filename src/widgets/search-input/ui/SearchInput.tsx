import { useSearchInput } from "../model/useSearchInput";

export const SearchInput = () => {
  const { value, handleChange } = useSearchInput();
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Что хочешь включить?"
      className="bg-[#262729] rounded-full p-3 w-full outline-none"
    />
  );
};
