import { useEffect, useState } from "react";
import axios from "axios";
import { Artist, Release, Track } from "../../types/types";
import { API_URL } from "@shared/constants/constants";

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

  const dataKey = dataKeyMap[sectionName];

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/${sectionName}`);
        const rawData = res.data;

        if (sectionName === "popular-tracks") {
          setList(rawData.tracks.map((item: { track: Track }) => item.track));
        } else {
          setList(rawData[dataKey]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [sectionName, dataKey]);

  return { list, loading };
};
