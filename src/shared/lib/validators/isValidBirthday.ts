export const isValidDate = (day: number, month: number, year: number) => {
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

export const isValidDay = (day: number) => {
  return day > 0 && day <= 31;
};
