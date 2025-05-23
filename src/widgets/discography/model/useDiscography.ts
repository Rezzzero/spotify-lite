import { useParams } from "react-router-dom";
import { useDiscographyData } from "../../../features/discography/hooks/useDiscographyData";
import { useDropdown } from "../../../shared/lib/hooks/useDropDown";
import { useState } from "react";

export const useDiscography = ({
  setIsFilterDropDownOpen,
  setIsSortDropDownOpen,
}: {
  setIsFilterDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSortDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

  return {
    filteredDiscography,
    selectedFilterByType,
    handleChangeFilter,
    sorting,
    sortDiscography,
    discographyFormat,
    setDiscographyFormat,

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
