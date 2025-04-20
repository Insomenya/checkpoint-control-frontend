import { CustomFiltersConfig, CustomFilterOption } from "@/models/common";
import { UserDTO } from "@/models/users";

export const ROLE_FILTER_OPTIONS: CustomFilterOption[] = [
  { value: 'admin', label: 'Администратор' },
  { value: 'operator', label: 'Оператор' },
  { value: 'logistician', label: 'Логист' }
];

export const USERS_CUSTOM_FILTERS: CustomFiltersConfig<UserDTO> = {
  filters: [
    {
      key: 'role',
      label: 'Роль пользователя',
      options: ROLE_FILTER_OPTIONS,
      placeholder: 'Фильтр по роли'
    }
  ]
}; 