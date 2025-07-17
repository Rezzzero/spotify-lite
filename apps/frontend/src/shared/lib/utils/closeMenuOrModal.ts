export const closeMenuOrModal = (
  setContent: React.Dispatch<React.SetStateAction<boolean>>,
  setAnchor?: React.Dispatch<React.SetStateAction<HTMLElement | null>>
) => {
  setContent(false);
  if (setAnchor) setAnchor(null);
  const scrollContainer = document.querySelector(
    ".page-content"
  ) as HTMLElement | null;
  if (scrollContainer) {
    scrollContainer.style.overflow = "";
  }
};
