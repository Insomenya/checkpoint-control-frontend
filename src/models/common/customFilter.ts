export type CustomFilterOption = {
  value: string;
  label: string;
};

export type CustomFilter<T extends object> = {
  key: keyof T;
  label: string;
  options: CustomFilterOption[];
  placeholder?: string;
  replaceDefaultFilter?: boolean;
};

export type CustomFiltersConfig<T extends object> = {
  filters: CustomFilter<T>[];
}; 