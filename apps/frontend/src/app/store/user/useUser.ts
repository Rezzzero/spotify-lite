import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUserStore = () => {
    const context = useContext(UserContext);
    return context;
}