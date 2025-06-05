import { Tooltip } from "@mui/material";
import { ReactElement } from "react";

export const CustomTooltip = ({
  children,
  title,
  placement,
  withBorder,
}: {
  children: ReactElement;
  title: string;
  placement?: "top" | "bottom" | "left" | "right";
  withBorder?: boolean;
}) => {
  return (
    <Tooltip
      title={title}
      disableInteractive
      placement={placement}
      slotProps={{
        tooltip: {
          sx: {
            color: "#fff",
            backgroundColor: "#262729",
            fontSize: "14px",
            ...(withBorder && { border: "1px solid #fff" }),
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};
