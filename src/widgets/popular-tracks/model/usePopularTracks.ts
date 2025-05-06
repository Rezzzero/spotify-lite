import { useEffect, useState } from "react";
import axios from "axios";
import { Track } from "../../../shared/types/types";

interface TrackList {
  track: Track;
}

export const usePopularTracks = () => {
  const [list, setList] = useState([] as TrackList[]);

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
