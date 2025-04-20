// Type definition for a single filter option
export type CustomFilterOption = {
  value: string;
  label: string;
};

// Type definition for a custom filter
export type CustomFilter<T extends object> = {
  key: keyof T; // The property in the data to filter on
  label: string; // Label for the filter dropdown
  options: CustomFilterOption[]; // Available filter options
  placeholder?: string; // Optional placeholder text
  replaceDefaultFilter?: boolean; // Whether to replace the default text filter
};

// Type definition for custom filters configuration
export type CustomFiltersConfig<T extends object> = {
  filters: CustomFilter<T>[];
}; 