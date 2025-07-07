export const formatMsToMinutesAndSeconds = (ms: number, addWords?: boolean) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  if (addWords) return `${minutes} мин. ${seconds} сек.`;
  return `${minutes}:${Number(seconds) < 10 ? `0${seconds}` : seconds}`;
};
