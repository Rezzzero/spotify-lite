const formatter = new Intl.RelativeTimeFormat("ru", {
  numeric: "auto",
});

const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

export function formatTimeAgo(date: Date | string) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  let duration = (dateObj.getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(
        Math.round(duration),
        division.name as Intl.RelativeTimeFormatUnit
      );
    }
    duration /= division.amount;
  }
}
