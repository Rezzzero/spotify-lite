export const formatReleaseDate = (date: string) => {
  const currentYear = new Date().getFullYear();
  let releaseDay;
  const releaseMonth = new Date(date).toLocaleString("ru", { month: "short" });
  const releaseYear = new Date(date).getFullYear();
  let year;
  if (releaseYear === currentYear) {
    year = ``;
    releaseDay = new Date(date).getDate();
  } else {
    year = `${releaseYear}г.`;
    releaseDay = ``;
  }
  return `${releaseDay} ${releaseMonth} ${year}`;
};
