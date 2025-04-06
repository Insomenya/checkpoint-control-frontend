import { Directions } from "@/models/common";

export const getDirectionName = (direction: Directions) => (direction === 'IN' ? 'Въезд' : 'Выезд');
