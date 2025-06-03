import { useParams } from "react-router-dom";
import { useFetchList } from "@shared/lib/hooks/useFetchList";
import { CardItem, Track } from "@shared/types/types";
type SectionName = "popular-artists" | "popular-tracks" | "new-releases";

const titleList = {
  "popular-artists": "Популярные исполнители",
  "popular-tracks": "Популярные треки",
  "new-releases": "Новые релизы",
} as const;

const typeList = {
  "popular-artists": "artist",
  "popular-tracks": "track",
  "new-releases": "album",
};

export const useSectionList = () => {
  const { name } = useParams();
  const { list } = useFetchList(name as SectionName);
  const type = typeList[name as SectionName];
  const title = titleList[name as SectionName];
  let adaptedList: CardItem[] = [];

  if (name === "popular-tracks") {
    adaptedList = (list as Track[]).map((track) => ({
      name: track.name,
      images: track.album.images,
      artists: track.artists,
      duration_ms: track.duration_ms,
      id: track.id,
      release_date: track.album.release_date,
    }));
  } else {
    adaptedList = list as CardItem[];
  }

  return { title, list: adaptedList, type };
};
