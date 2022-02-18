import { useContext } from "react";
import { TareasContext } from "../Context/context";
export const useTareasGlobalContext = () => {
  return useContext(TareasContext);
};
