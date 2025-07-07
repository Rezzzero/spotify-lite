import { useContext } from "react";
import { MediaLibraryContext } from "./MediaLibraryContext";

export const useMediaLibraryStore = () => {
  const context = useContext(MediaLibraryContext);
  return context;
};
