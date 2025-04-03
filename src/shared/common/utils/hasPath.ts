import { Location } from "react-router-dom";

export const hasPath = (path:string, location: Location<any>) => location.pathname.includes(path);
