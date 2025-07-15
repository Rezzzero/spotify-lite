import { useEffect } from "react";

type RefType = React.RefObject<HTMLElement | null> | null;

export const useClickOutside = ({
  refs,
  handler,
  enabled,
}: {
  refs: RefType | RefType[];
  handler: (event: MouseEvent) => void;
  enabled: boolean;
}) => {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent) => {
      const refArray = Array.isArray(refs) ? refs : [refs];
      if (
        refArray.every(
          (ref) =>
            !ref?.current ||
            (event.target instanceof Node &&
              !ref.current.contains(event.target))
        )
      ) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [enabled]);
};
