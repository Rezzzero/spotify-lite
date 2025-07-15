import { useRef, useState } from "react";
import { useClickOutside } from "./useClickOutside";

export const useDropdown = (onToggle: (open: boolean) => void = () => {}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    refs: [buttonRef, dropDownRef],
    handler: () => hide(),
    enabled: open,
  });
  const show = () => {
    setOpen(true);
    onToggle(true);
  };

  const hide = () => {
    setOpen(false);
    onToggle(false);
  };

  return {
    open,
    show,
    hide,
    buttonRef,
    dropDownRef,
  };
};
