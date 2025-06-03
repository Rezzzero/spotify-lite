import { useParams } from "react-router-dom";
import { useDiscographyData } from "@features/discography/hooks/useDiscographyData";
import { useDropdown } from "@shared/lib/hooks/useDropDown";
import { useEffect, useRef, useState } from "react";

export const useDiscography = ({
  setIsFilterDropDownOpen,
  setIsSortDropDownOpen,
  scrollContainerRef,
}: {
  setIsFilterDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSortDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { id, filter } = useParams();
  const {
    filteredDiscography,
    selectedFilterByType,
    sorting,
    handleChangeFilter,
    sortDiscography,
  } = useDiscographyData({ filterFromUrl: filter, id });
  const filterDropdown = useDropdown(setIsFilterDropDownOpen);
  const sortDropdown = useDropdown(setIsSortDropDownOpen);
  const [discographyFormat, setDiscographyFormat] = useState("list");
  const albumRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeAlbum, setActiveAlbum] = useState<string | null>("");

  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    if (!scrollEl) return;

    const onScroll = () => {
      const scrollTop = scrollEl.scrollTop;

      if (scrollTop < 100) {
        setActiveAlbum(null);
        return;
      }

      const scrollPosition = scrollEl.scrollTop + 100;
      for (let i = 0; i < albumRefs.current.length; i++) {
        const album = albumRefs.current[i];
        if (album) {
          const offsetTop = album.offsetTop;
          const nextAlbum = albumRefs.current[i + 1];
          const nextOffsetTop = nextAlbum ? nextAlbum.offsetTop : Infinity;

          if (scrollPosition >= offsetTop && scrollPosition < nextOffsetTop) {
            setActiveAlbum(album.dataset.name || "");
            break;
          }
        }
      }
    };

    scrollEl.addEventListener("scroll", onScroll);
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

  return {
    filteredDiscography,
    selectedFilterByType,
    handleChangeFilter,
    sorting,
    sortDiscography,
    discographyFormat,
    setDiscographyFormat,
    albumRefs,
    activeAlbum,

    filterDropDownRef: filterDropdown.dropDownRef,
    filterButtonRef: filterDropdown.buttonRef,
    showFilterDropDown: filterDropdown.open,
    handleShowFilterDropDown: filterDropdown.show,
    handleHideFilterDropDown: filterDropdown.hide,

    sortDropDownRef: sortDropdown.dropDownRef,
    sortButtonRef: sortDropdown.buttonRef,
    showSortDropDown: sortDropdown.open,
    handleShowSortDropDown: sortDropdown.show,
    handleHideSortDropDown: sortDropdown.hide,
  };
};
