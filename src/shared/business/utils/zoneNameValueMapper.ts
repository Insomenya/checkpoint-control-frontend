import { Zone, ZONE_NAMES, ZONES } from "@/features/checkpoints/constants";
import { ZoneValues } from "@/models/common";

export const zoneNameValueMapper = (zoneName: string): ZoneValues | null => {
    switch(zoneName) {
        case ZONE_NAMES[Zone.kpp]: return ZONES[Zone.kpp];
        case ZONE_NAMES[Zone.bp]: return ZONES[Zone.bp];
        case ZONE_NAMES[Zone.warehouse]: return ZONES[Zone.warehouse];
        default: return null;
    }
};

export const zoneValueNameMapper = (value: number): string => {
    if (value === ZONES[Zone.kpp]) return ZONE_NAMES[Zone.kpp];
    if (value === ZONES[Zone.bp]) return ZONE_NAMES[Zone.bp];
    if (value === ZONES[Zone.warehouse]) return ZONE_NAMES[Zone.warehouse];
    return '';
};