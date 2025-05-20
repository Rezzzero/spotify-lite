import { useState, useEffect } from "react";
import { useExtractColors } from "react-extract-colors";

export const useGetColors = (imageUrl: string | null) => {
  const [imageColors, setImageColors] = useState<string[] | null>(null);

  const { dominantColor, darkerColor } = useExtractColors(imageUrl || "", {
    format: "hex",
    maxSize: 200,
  });

  useEffect(() => {
    if (dominantColor && darkerColor) {
      setImageColors([dominantColor, darkerColor]);
    }
  }, [dominantColor, darkerColor]);

  return { imageColors };
};
