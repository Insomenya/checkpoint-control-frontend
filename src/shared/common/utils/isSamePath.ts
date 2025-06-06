import { ROUTER_PATHS } from "@shared/common/constants";
import { Location } from "react-router-dom";

export const isSamePath = (path: string, location: Location<any>) => location.pathname === ROUTER_PATHS.ROOT + path;
