import { CustomFilter, CustomFiltersConfig } from "@/models/common";
import { ExpeditionDTO } from "@/models/expeditions";
import { 
    ExpeditionDirection, 
    EXPEDITION_DIRECTION_NAMES, 
    ExpeditionType, 
    EXPEDITION_TYPE_NAMES 
} from "./index";

export const EXPEDITION_DIRECTION_FILTER_OPTIONS = Object.values(ExpeditionDirection).map(direction => ({
    value: direction,
    label: EXPEDITION_DIRECTION_NAMES[direction],
}));

export const EXPEDITION_TYPE_FILTER_OPTIONS = Object.values(ExpeditionType).map(type => ({
    value: type.toLowerCase(),
    label: EXPEDITION_TYPE_NAMES[type],
}));

const typeFilter: CustomFilter<ExpeditionDTO> = {
    key: 'type' as keyof ExpeditionDTO,
    label: 'Тип экспедиции',
    options: EXPEDITION_TYPE_FILTER_OPTIONS
};

const directionFilter: CustomFilter<ExpeditionDTO> = {
    key: 'direction' as keyof ExpeditionDTO,
    label: 'Направление',
    options: EXPEDITION_DIRECTION_FILTER_OPTIONS
};

export const EXPEDITIONS_CUSTOM_FILTERS: CustomFiltersConfig<ExpeditionDTO> = {
    filters: [typeFilter, directionFilter]
}; 