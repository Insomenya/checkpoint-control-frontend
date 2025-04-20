import { Zone, ZONE_NAMES, ZONES } from "@/features/checkpoints/constants";

export const ZONE_OPTIONS = [
  { label: 'Все', value: '' },
  { label: ZONE_NAMES[Zone.kpp], value: String(ZONES[Zone.kpp]) },
  { label: ZONE_NAMES[Zone.bp], value: String(ZONES[Zone.bp]) },
  { label: ZONE_NAMES[Zone.warehouse], value: String(ZONES[Zone.warehouse]) }
]; 