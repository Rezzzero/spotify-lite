import { useParams } from "react-router-dom";
import { useDiscographyData } from "@features/discography/hooks/useDiscographyData";
import { useDropdown } from "@shared/lib/hooks/useDropDown";
import { useState } from "react";
import { useUserStore } from "@app/store/user/useUser";
import { useMediaLibraryStore } from "@app/store/media-library/useMediaLibraryStore";

export const useDiscography = ({
  setIsFilterDropDownOpen,
  setIsSortDropDownOpen,
}: {
  setIsFilterDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSortDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();
  const { playlists } = useMediaLibraryStore();
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
    playlists,
    user,

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
