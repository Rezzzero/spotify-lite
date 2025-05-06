import axios from "axios";
import { useEffect, useState } from "react";
import { Artist } from "../../../shared/types/types";

export const usePopularArtists = () => {
  const [list, setList] = useState([] as Artist[]);

  useEffect(() => {
    const fetch = async () => {
      const artistsRes = await axios.get(
        `http://localhost:3000/api/popular-artists`
      );
      setList(artistsRes.data.artists);
    };
    fetch();
  }, []);

  return { list };
};
