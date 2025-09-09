import { useContext } from "react";
import UserContext from "../Context/UserContext";

const useAuth = () => {
    return useContext(UserContext)
}

export default useAuth