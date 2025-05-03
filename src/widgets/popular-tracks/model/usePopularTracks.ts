import { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "../../../shared/types/types";

interface Track {
  track: {
    name: string;
    album: {
      images: {
        0: Image;
        1: Image;
        2: Image;
      };
    };
  };
}

export const usePopularTracks = () => {
  const [list, setList] = useState([] as Track[]);

  useEffect(() => {
    const fetch = async () => {
      const tracksRes = await axios.get(
        `http://localhost:3000/api/popular-tracks`
      );
      setList(tracksRes.data.tracks);
    };
    fetch();
  }, []);

  return { list };
};
