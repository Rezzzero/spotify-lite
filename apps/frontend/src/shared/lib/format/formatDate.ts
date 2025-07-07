export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const months = [
    "янв.",
    "фев.",
    "мар.",
    "апр.",
    "май",
    "июн.",
    "июл.",
    "авг.",
    "сен.",
    "окт.",
    "ноя.",
    "дек.",
  ];

  return `${day} ${months[month]} ${year} г.`;
};
