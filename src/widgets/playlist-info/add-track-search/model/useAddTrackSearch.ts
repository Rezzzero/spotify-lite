import { useState } from "react";

export const useAddTrackSearch = () => {
  const [value, setValue] = useState("");

  return { value, setValue };
};
