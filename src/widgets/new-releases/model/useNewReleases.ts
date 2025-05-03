import { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "../../../shared/types/types";

interface Release {
  name: string;
  images: {
    0: Image;
    1: Image;
    2: Image;
  };
}

export const useNewReleases = () => {
  const [releases, setReleases] = useState([] as Release[]);

  useEffect(() => {
    const fetch = async () => {
      const releasesRes = await axios.get(
        `http://localhost:3000/api/new-releases`
      );
      setReleases(releasesRes.data.releases);
    };
    fetch();
  }, []);

  return { releases };
};
