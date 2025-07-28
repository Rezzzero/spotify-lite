import { useParams } from "react-router-dom";

export const useMediaLibraryCard = () => {
  const { id: currentId } = useParams();
  //add menu logic
  return {
    currentId,
  };
};
