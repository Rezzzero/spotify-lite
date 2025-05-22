import { useEffect, useState } from "react";
import { Album } from "../../../shared/types/types";
import axios from "axios";

export const useDiscographyData = ({
  filterFromUrl,
  id,
}: {
  filterFromUrl: string | undefined;
  id: string | undefined;
}) => {
  const [discography, setDiscography] = useState<Album[]>([]);
  const [filteredDiscography, setFilteredDiscography] = useState<Album[]>([]);
  const [selectedFilterByType, setSelectedFilterByType] = useState<string>(
    filterFromUrl || "all"
  );
  const [sorting, setSorting] = useState<{
    by: string;
    name: string;
    ascOrder: boolean;
  }>({ by: "release_date", name: "Дата выпуска", ascOrder: false });

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/discography/${id}`
        );
        const data: Album[] = response.data.discography;
        setDiscography(data);
        if (filterFromUrl === "all") {
          setFilteredDiscography(data);
        } else {
          setFilteredDiscography(
            data.filter((album: Album) => album.album_type === filterFromUrl)
          );
        }
      } catch (error) {
        console.error("Error fetching discography:", error);
      }
    };

    fetch();
  }, [id, filterFromUrl]);

  const handleChangeFilter = (filter: string) => {
    setSelectedFilterByType(filter);
    setFilteredDiscography(
      filter === "all"
        ? discography
        : discography.filter((album) => album.album_type === filter)
    );
  };

  const sortDiscography = (
    sortBy: keyof Album,
    name: string,
    ascOrder: boolean
  ) => {
    setSorting({ by: sortBy, name, ascOrder });

    const sorted = [...filteredDiscography].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (
        sortBy === "release_date" &&
        typeof aVal === "string" &&
        typeof bVal === "string"
      ) {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
        return ascOrder ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return ascOrder ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return ascOrder ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      return 0;
    });

    setFilteredDiscography(sorted);
  };

  return {
    filteredDiscography,
    selectedFilterByType,
    sorting,
    handleChangeFilter,
    sortDiscography,
  };
};
