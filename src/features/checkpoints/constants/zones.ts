import { ZoneValues } from "@/models/common";

export enum Zone {
    kpp = 'KPP',
    bp = 'BP',
    warehouse = 'WAREHOUSE',
}

//Соответствует порядку на въезд
export const ZONES: Record<Zone, ZoneValues> = {
    [Zone.kpp]: 1,
    [Zone.bp]: 2,
    [Zone.warehouse]: 3,
}

export const ZONE_NAMES: Record<Zone, string> = {
    [Zone.kpp]: 'КПП',
    [Zone.bp]: 'Бюро пропусков',
    [Zone.warehouse]: 'Склад',
}
