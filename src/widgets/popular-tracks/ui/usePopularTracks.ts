import { useEffect, useState } from "react";
import axios from "axios";

interface TrackImage {
  url: string;
  width: number;
  height: number;
}

export type Track = {
  track: {
    name: string;
    album: {
      images: {
        0: TrackImage;
        1: TrackImage;
        2: TrackImage;
      };
    };
  };
};

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
