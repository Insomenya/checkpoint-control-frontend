import { ROUTER_PATHS } from "@shared/common/constants";
import { useNavigate } from "react-router-dom";


export const useNavigateHandler = () => {
    const navigate = useNavigate();

    return (path: string) => () => navigate(ROUTER_PATHS.ROOT + path);
};

export type NavigateHandler = ReturnType<typeof useNavigateHandler>;
