import { CustomFiltersConfig, CustomFilterOption } from "@/models/common";
import { Good } from "@/models/goods";

export const UNIT_OF_MEASUREMENT_FILTER_OPTIONS: CustomFilterOption[] = [
  { value: 'шт', label: 'Штуки' },
  { value: 'кг', label: 'Килограммы' },
  { value: 'л', label: 'Литры' },
  { value: 'м', label: 'Метры' }
];

export const GOODS_CUSTOM_FILTERS: CustomFiltersConfig<Good> = {
  filters: [
    {
      key: 'unit_of_measurement',
      label: 'Единица измерения',
      options: UNIT_OF_MEASUREMENT_FILTER_OPTIONS,
      placeholder: 'Фильтр по ед. изм.'
    }
  ]
}; 