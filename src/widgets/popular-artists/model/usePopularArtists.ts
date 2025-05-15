import { useFetchList } from "../../../shared/lib/hooks/useFetchList";

export const usePopularArtists = () => {
  const { list: artists } = useFetchList("popular-artists");

  return { artists };
};
