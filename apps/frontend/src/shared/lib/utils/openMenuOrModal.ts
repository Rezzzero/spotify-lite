export const openMenuOrModal = (
  e: React.MouseEvent<HTMLElement | null>,
  setContent: React.Dispatch<React.SetStateAction<boolean>>,
  setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>
) => {
  setAnchor(e.currentTarget);
  setContent((prev) => {
    const scrollContainer = document.querySelector(
      ".page-content"
    ) as HTMLElement | null;

    const next = !prev;
    if (scrollContainer) {
      if (next) {
        scrollContainer.style.overflow = "hidden";
      } else {
        scrollContainer.style.overflow = "";
      }
    }
    return next;
  });
};
