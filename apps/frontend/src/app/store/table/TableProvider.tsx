import { ReactNode, useState } from "react";
import { TableContext } from "./TableContext";

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [colSizes, setColSizes] = useState<{ [key: string]: number[] }>({
    default: [40, 565, 390, 295, 155],
    withoutAlbum: [40, 1150, 255],
    withoutAddedAt: [40, 955, 295, 155],
  });
  return (
    <TableContext.Provider value={{ colSizes, setColSizes }}>
      {children}
    </TableContext.Provider>
  );
};
