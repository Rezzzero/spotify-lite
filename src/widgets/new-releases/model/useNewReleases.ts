import { useFetchList } from "../../../shared/lib/hooks/useFetchList";

export const useNewReleases = () => {
  const { list: releases } = useFetchList("new-releases");

  return { releases };
};
