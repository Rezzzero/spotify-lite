import { useParams } from "react-router-dom";
import { useDiscographyData } from "@features/discography/hooks/useDiscographyData";
import { useDropdown } from "@shared/lib/hooks/useDropDown";
import { useState } from "react";

export const useDiscography = ({
  setIsFilterDropDownOpen,
  setIsSortDropDownOpen,
}: {
  setIsFilterDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSortDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { id, filter } = useParams();
  const [loading, setLoading] = useState(false);
  const {
    filteredDiscography,
    selectedFilterByType,
    sorting,
    handleChangeFilter,
    sortDiscography,
  } = useDiscographyData({ filterFromUrl: filter, id, setLoading });
  const filterDropdown = useDropdown(setIsFilterDropDownOpen);
  const sortDropdown = useDropdown(setIsSortDropDownOpen);
  const [discographyFormat, setDiscographyFormat] = useState("list");
  const [activeAlbum, setActiveAlbum] = useState<string | null>("");

  return {
    filteredDiscography,
    selectedFilterByType,
    handleChangeFilter,
    sorting,
    sortDiscography,
    discographyFormat,
    setDiscographyFormat,
    activeAlbum,
    setActiveAlbum,
    loading,

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
