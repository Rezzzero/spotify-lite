import { createContext, SetStateAction } from "react";

export type TableContextType = {
  colSizes: {
    [key: string]: number[];
  };
  setColSizes: React.Dispatch<SetStateAction<{ [key: string]: number[] }>>;
};

export const TableContext = createContext({} as TableContextType);
