import { ExpeditionDirections } from "@/models/expeditions";

export const getDirectionName = (direction: ExpeditionDirections) => (direction === 'IN' ? 'Въезд' : 'Выезд');
