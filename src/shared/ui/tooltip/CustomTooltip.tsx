import { Tooltip } from "@mui/material";
import { ReactElement, ReactNode } from "react";

export const CustomTooltip = ({
  children,
  title,
  placement,
  withBorder,
  customFontSize,
  disableHoverListener,
}: {
  children: ReactElement;
  title: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  withBorder?: boolean;
  customFontSize?: number;
  disableHoverListener?: boolean;
}) => {
  return (
    <Tooltip
      title={title}
      disableInteractive
      placement={placement}
      disableHoverListener={disableHoverListener}
      slotProps={{
        tooltip: {
          sx: {
            color: "#fff",
            backgroundColor: "#262729",
            fontSize: customFontSize ? `${customFontSize}px` : "14px",
            padding: "8px",
            ...(withBorder && { border: "1px solid #fff" }),
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};
