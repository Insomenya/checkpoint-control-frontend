import { CustomFilter } from '@/models/common';
import { Select } from '@v-uik/base';
import { useState } from 'react';

type CustomFilterDropdownProps<T extends object> = {
  filter: CustomFilter<T>;
  onChange: (key: keyof T, value: string) => void;
  size?: 'sm' | 'md' | 'lg';
};

export const CustomFilterDropdown = <T extends object>({
  filter,
  onChange,
  size = 'sm'
}: CustomFilterDropdownProps<T>) => {
  const [value, setValue] = useState<string>('');

  const allOptions = [
    { value: '', label: 'Не выбрано' },
    ...filter.options
  ];

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(filter.key, newValue);
  };

  return (
    <Select
      label={filter.label}
      placeholder={filter.placeholder || 'Выберите значение'}
      size={size}
      value={value}
      onChange={handleChange}
      options={allOptions}
    />
  );
}; 