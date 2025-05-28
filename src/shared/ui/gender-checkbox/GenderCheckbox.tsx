import Checkbox from "@mui/material/Checkbox";
import GenderCheckedIcon from "../../../shared/assets/auth/gender-checked-icon.svg?react";
import GenderUncheckedIcon from "../../../shared/assets/auth/gender-unchecked-icon.svg?react";

export const GenderCheckbox = ({ checked }: { checked: boolean }) => {
  return (
    <Checkbox
      checked={checked}
      icon={
        <GenderUncheckedIcon className="text-gray-400 hover:text-[#4ADE80]" />
      }
      checkedIcon={<GenderCheckedIcon />}
      disabled
      style={{ width: "12px", height: "12px", padding: "0px" }}
    />
  );
};
