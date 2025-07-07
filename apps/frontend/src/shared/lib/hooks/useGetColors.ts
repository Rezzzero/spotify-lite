import { USER_PLACEHOLDER_URL } from "@shared/constants/urls";
import { useState, useEffect } from "react";
import { useExtractColors } from "react-extract-colors";

export const useGetColors = (imageUrl: string | null) => {
  const [imageColors, setImageColors] = useState<string[] | null>(null);

  const { dominantColor, darkerColor } = useExtractColors(imageUrl || "", {
    format: "hex",
    maxSize: 200,
  });

  useEffect(() => {
    if (!imageUrl || imageUrl === USER_PLACEHOLDER_URL) {
      setImageColors(null);
      return;
    }

    if (dominantColor && darkerColor) {
      setImageColors([dominantColor, darkerColor]);
    }
  }, [imageUrl, dominantColor, darkerColor]);

  return { imageColors };
};
