import { ExpeditionDirections } from "@/models/expeditions";

export enum ExpeditionDirection {
    in = 'IN',
    out = 'OUT',
}

export const EXPEDITION_DIRECTIONS: Record<ExpeditionDirection, ExpeditionDirections> = {
    [ExpeditionDirection.in]: 'IN',
    [ExpeditionDirection.out]: 'OUT',
};

export const EXPEDITION_DIRECTION_NAMES: Record<ExpeditionDirection, string> = {
    [ExpeditionDirection.in]: 'Въезд',
    [ExpeditionDirection.out]: 'Выезд',
}; 