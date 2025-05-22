import { useCallback, useEffect, useRef, useState } from "react";

export const useDropdown = (onToggle: (open: boolean) => void = () => {}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const show = useCallback(() => {
    setOpen(true);
    onToggle(true);
  }, [onToggle]);

  const hide = useCallback(() => {
    setOpen(false);
    onToggle(false);
  }, [onToggle]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        hide();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, hide]);

  return {
    open,
    show,
    hide,
    buttonRef,
    dropDownRef,
  };
};
