import { MONTHS_GENITIVE } from "../../constants/constants";

export const formatReleaseDate = (date: string, isAlbum?: boolean) => {
  const currentYear = new Date().getFullYear();
  const parsedDate = new Date(date);
  let releaseDay;
  const monthIndex = parsedDate.getMonth();
  const releaseMonth = isAlbum
    ? MONTHS_GENITIVE[monthIndex]
    : parsedDate.toLocaleString("ru", {
        month: "short",
      });
  const releaseYear = parsedDate.getFullYear();
  let year;
  if (releaseYear === currentYear) {
    year = isAlbum ? `${releaseYear}г.` : ``;
    releaseDay = parsedDate.getDate();
  } else {
    year = `${releaseYear}г.`;
    releaseDay = isAlbum ? parsedDate.getDate() : ``;
  }
  return `${releaseDay} ${releaseMonth} ${year}`;
};
