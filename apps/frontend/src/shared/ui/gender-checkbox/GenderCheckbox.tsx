import Checkbox from "@mui/material/Checkbox";
import GenderCheckedIcon from "@shared/assets/auth/gender-checked-icon.svg?react";
import GenderUncheckedIcon from "@shared/assets/auth/gender-unchecked-icon.svg?react";

export const GenderCheckbox = ({ checked }: { checked: boolean }) => {
  return (
    <Checkbox
      checked={checked}
      icon={
        <GenderUncheckedIcon className="text-zinc-600 group-hover:text-[#4ADE80]" />
      }
      checkedIcon={<GenderCheckedIcon />}
      disabled
      style={{
        width: 15,
        height: 15,
        padding: 0,
      }}
    />
  );
};
