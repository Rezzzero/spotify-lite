import { useFetchList } from "@shared/lib/hooks/useFetchList";

export const usePopularTracks = () => {
  const { list: tracks } = useFetchList("popular-tracks");
  return { tracks };
};
