import { useEffect, useState } from "react";
import axios from "axios";
import { Artist, Release, Track } from "../../types/types";

type SectionName = "popular-artists" | "popular-tracks" | "new-releases";

type SectionDataMap = {
  "popular-artists": Artist[];
  "popular-tracks": Track[];
  "new-releases": Release[];
};

const dataKeyMap = {
  "popular-artists": "artists",
  "popular-tracks": "track",
  "new-releases": "releases",
} as const;

export const useFetchList = <T extends SectionName>(sectionName: T) => {
  const [list, setList] = useState<SectionDataMap[T]>([] as SectionDataMap[T]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const dataKey = dataKeyMap[sectionName];

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/api/${sectionName}`);
        const rawData = res.data;

        if (sectionName === "popular-tracks") {
          setList(rawData.tracks.map((item: { track: Track }) => item.track));
        } else {
          setList(rawData[dataKey]);
        }
      } catch (error: any) {
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [sectionName, dataKey]);

  return { list, loading, error };
};
