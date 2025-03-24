import { ROUTER_PATHS } from "@shared/constants";
import { useNavigate } from "react-router-dom";


export const useNavigateHandler = () => {
    const navigate = useNavigate();

    return (path: string) => () => navigate(ROUTER_PATHS.ROOT + path);
};
