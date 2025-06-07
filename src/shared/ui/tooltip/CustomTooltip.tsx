import { Tooltip } from "@mui/material";
import { ReactElement } from "react";

export const CustomTooltip = ({
  children,
  title,
  placement,
  withBorder,
  customFontSize,
}: {
  children: ReactElement;
  title: string;
  placement?: "top" | "bottom" | "left" | "right";
  withBorder?: boolean;
  customFontSize?: number;
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
            fontSize: customFontSize ? `${customFontSize}px` : "14px",
            ...(withBorder && { border: "1px solid #fff" }),
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};
