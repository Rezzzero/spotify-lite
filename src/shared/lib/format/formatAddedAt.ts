import { formatDate } from "./formatDate";
import { formatTimeAgo } from "./formatTimeAgo";

export const formatAddedAt = (addedAt: string) => {
  const date = new Date(addedAt);
  const now = new Date();
  const diffInMonths =
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30);

  return diffInMonths >= 1 ? formatDate(addedAt) : formatTimeAgo(addedAt);
};
