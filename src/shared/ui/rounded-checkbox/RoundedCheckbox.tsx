import Checkbox from "@mui/material/Checkbox";
import CheckedIcon from "@shared/assets/auth/checked-icon.svg?react";
import UncheckedIcon from "@shared/assets/auth/unchecked-icon.svg?react";

export const RoundedCheckbox = ({ checked }: { checked: boolean }) => {
  return (
    <Checkbox
      checked={checked}
      icon={<UncheckedIcon />}
      checkedIcon={<CheckedIcon />}
      disabled
      style={{ width: "12px", height: "12px", padding: "0px" }}
    />
  );
};
