import { ExpeditionTypes } from "@/models/expeditions";

export enum ExpeditionType {
    auto = 'AUTO',
    selfauto = 'SELFAUTO',
    selfout = 'SELFOUT',
};

export const EXPEDITION_TYPES: Record<ExpeditionType, ExpeditionTypes> = {
    [ExpeditionType.auto]: 'auto',
    [ExpeditionType.selfauto]: 'selfauto',
    [ExpeditionType.selfout]: 'selfout',
};

export const EXPEDITION_TYPE_NAMES: Record<ExpeditionType, string> = {
    [ExpeditionType.auto]: 'Авто',
    [ExpeditionType.selfauto]: 'Самовывоз',
    [ExpeditionType.selfout]: 'Самовынос',
};
