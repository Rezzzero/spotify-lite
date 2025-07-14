import { useContext } from "react";
import { TableContext } from "./TableContext";

export const useTableStore = () => {
  const context = useContext(TableContext);
  return context;
};
