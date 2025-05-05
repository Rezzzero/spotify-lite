import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);

    if (query) {
      navigate(`/search/${query}`);
    } else {
      navigate("/search");
    }
  };

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
