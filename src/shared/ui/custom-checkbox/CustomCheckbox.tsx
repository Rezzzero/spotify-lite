import Checkbox from "@mui/material/Checkbox";
import CheckedIcon from "@shared/assets/auth/square-checked-icon.svg?react";
import UncheckedIcon from "@shared/assets/auth/square-unchecked-icon.svg?react";

export const CustomCheckbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      icon={
        <UncheckedIcon className="text-zinc-400 group-hover:text-[#4ADE80]" />
      }
      checkedIcon={<CheckedIcon />}
      style={{
        width: 17,
        height: 17,
        padding: 0,
        cursor: "default",
      }}
    />
  );
};
