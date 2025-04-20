# Select

Компонент представляет собой раскрывающийся элемент выбора опций.

## Импорт

```tsx
import { Select } from '@v-uik/select'
```

или

```tsx
import { Select } from '@v-uik/base'
```

## API

### Свойства компонента

| Свойство                  | Тип                                           | По умолчанию | Описание                                           |
| ------------------------- | --------------------------------------------- | ------------ | -------------------------------------------------- |
| `options`                 | `Option[]`                                    | `[]`         | Список опций                                        |
| `value`                   | `string \| string[]`                          | -            | Значение или массив значений (при multiple=true)    |
| `onChange`                | `(value: string \| string[], event) => void`  | -            | Обработчик изменения значения                       |
| `defaultValue`            | `string \| string[]`                          | -            | Значение по умолчанию (для неконтролируемого режима)|
| `multiple`                | `boolean`                                     | `false`      | Режим множественного выбора                         |
| `limitByWidth`            | `boolean`                                     | `false`      | Ограничить ширину выпадающего меню шириной селекта  |
| `size`                    | `'sm' \| 'md' \| 'lg'`                       | `'md'`       | Размер компонента                                   |
| `error`                   | `boolean`                                     | `false`      | Индикатор ошибки                                    |
| `disabled`                | `boolean`                                     | `false`      | Заблокировать поле                                  |
| `label`                   | `React.ReactNode`                             | -            | Подпись над полем                                   |
| `labelProps`              | `InputLabelProps`                             | -            | Свойства компонента для подписи                     |
| `helperText`              | `React.ReactNode`                             | -            | Вспомогательный текст под полем                     |
| `helperTextProps`         | `InputHelperTextProps`                        | -            | Свойства компонента для вспомогательного текста     |
| `showErrorIcon`           | `boolean`                                     | `true`       | Показать иконку ошибки                              |
| `placeholder`             | `string`                                      | -            | Плейсхолдер (текст при отсутствии выбранного значения) |
| `rows`                    | `number`                                      | -            | Количество видимых строк в выпадающем списке        |
| `groupBy`                 | `(option: Option) => string`                  | -            | Функция для группировки опций                       |
| `dropdownProps`           | `DropdownProps`                               | -            | Свойства компонента Dropdown                        |
| `listProps`               | `ListProps`                                   | -            | Свойства компонента List                            |
| `components`              | `SelectComponentsConfig`                      | -            | Переопределение компонентов Select                  |
| `classes`                 | `Partial<Classes>`                            | -            | CSS классы для стилизации                           |
| `selectButtonProps`       | `SelectButtonProps`                           | -            | Свойства для кнопки селекта                         |
| `inputProps`              | `React.InputHTMLAttributes<HTMLInputElement>` | -            | Свойства для нативного элемента input               |
| `hideDropdownOnOutsideScroll` | `boolean`                                | `false`      | Скрывать дропдаун при скроле вне дропдауна          |
| `labelledClasses`         | `LabelledProps['classes']`                    | -            | Список классов для компонента Labelled              |

### Тип Option

```tsx
interface Option<T extends React.ElementType = 'li'> extends ListItemProps<T> {
  /**
   * Значение опции.
   */
  value: string;
  /**
   * Отображаемое имя опции.
   */
  label: React.ReactNode;
  /**
   * Заблокировать опцию.
   */
  disabled?: boolean;
  /**
   * Компонент в начале опции.
   */
  prefix?: React.ReactNode;
  /**
   * Компонент в конце опции.
   */
  suffix?: React.ReactNode;
}
```

## Примеры использования

### Базовое использование

```tsx
import { Select } from '@v-uik/select'
import { useState } from 'react'

export const BasicSelect = () => {
  const [value, setValue] = useState('')

  const options = [
    { value: '', label: 'Выберите опцию' },
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
    { value: '3', label: 'Опция 3' },
  ]

  return (
    <div style={{ width: '20rem' }}>
      <Select
        label="Выберите опцию"
        options={options}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
```

### Выбор с ограничением ширины

```tsx
import { Select } from '@v-uik/select'
import { useState } from 'react'

export const LimitedWidthSelect = () => {
  const [value, setValue] = useState('')

  const options = [
    { value: '', label: 'Выберите опцию' },
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
    { value: '3', label: 'Очень длинная опция, которая может не поместиться' },
  ]

  return (
    <div style={{ width: '20rem' }}>
      <Select
        label="Выберите опцию"
        options={options}
        value={value}
        onChange={setValue}
        limitByWidth
      />
    </div>
  )
}
```

### Индикация ошибки

```tsx
import { Select } from '@v-uik/select'
import { useState } from 'react'

export const ErrorSelect = () => {
  const [value, setValue] = useState('')

  const options = [
    { value: '', label: 'Выберите опцию' },
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
    { value: '3', label: 'Опция 3' },
  ]

  return (
    <div style={{ width: '20rem' }}>
      <Select
        label="Выберите опцию"
        options={options}
        value={value}
        onChange={setValue}
        error
        helperText="Это обязательное поле"
      />
    </div>
  )
}
```

### Множественный выбор

```tsx
import { Select } from '@v-uik/select'
import { useState } from 'react'

export const MultiSelect = () => {
  const [value, setValue] = useState([])

  const options = [
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
    { value: '3', label: 'Опция 3' },
    { value: '4', label: 'Опция 4' },
  ]

  return (
    <div style={{ width: '20rem' }}>
      <Select
        label="Выберите несколько опций"
        options={options}
        value={value}
        onChange={setValue}
        multiple
      />
    </div>
  )
}
```

### Настраиваемые опции

```tsx
import { Select } from '@v-uik/select'
import { useState } from 'react'

const Icon = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2" fill="currentColor" />
  </svg>
)

export const CustomOptionsSelect = () => {
  const [value, setValue] = useState('')

  const options = [
    { value: '', label: 'Выберите опцию', prefix: <Icon /> },
    { value: '1', label: 'Опция 1', prefix: <Icon /> },
    { value: '2', label: 'Опция 2', prefix: <Icon />, disabled: true },
    { value: '3', label: 'Опция 3', prefix: <Icon /> },
  ]

  return (
    <div style={{ width: '20rem' }}>
      <Select
        label="Выберите опцию"
        options={options}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
```

### Неконтролируемое состояние

```tsx
import { Select } from '@v-uik/select'

export const UncontrolledSelect = () => {
  const options = [
    { value: '', label: 'Выберите опцию' },
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
    { value: '3', label: 'Опция 3' },
  ]

  const handleChange = (value) => {
    console.log('Выбранное значение:', value)
  }

  return (
    <div style={{ width: '20rem' }}>
      <Select
        label="Выберите опцию"
        options={options}
        onChange={handleChange}
      />
    </div>
  )
}
```

### Со значением по умолчанию

```tsx
import { Select } from '@v-uik/select'

export const SelectWithDefaultValue = () => {
  const options = [
    { value: '', label: 'Выберите опцию' },
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
    { value: '3', label: 'Опция 3' },
  ]

  const handleChange = (value) => {
    console.log('Выбранное значение:', value)
  }

  return (
    <div style={{ width: '20rem' }}>
      <Select
        label="Выберите опцию"
        options={options}
        defaultValue="2"
        onChange={handleChange}
      />
    </div>
  )
}
```

### С пользовательской иконкой

```tsx
import React from 'react'
import { Select } from '@v-uik/select'

// Компонент пользовательской иконки
const DropdownIndicator = (props) => {
  const { isFocused } = props
  
  return (
    <div style={{ padding: '0 8px', color: isFocused ? 'blue' : 'black' }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path 
          d="M8 10L4 6h8l-4 4z" 
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

export const CustomIconSelect = () => {
  const [value, setValue] = React.useState('')

  const options = [
    { value: '', label: 'Выберите опцию' },
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
    { value: '3', label: 'Опция 3' },
  ]

  return (
    <div style={{ width: '20rem' }}>
      <Select
        label="Select"
        selectButtonProps={{
          id: 'basic-select',
        }}
        labelProps={{
          htmlFor: 'basic-select',
        }}
        options={options}
        value={value}
        components={{
          DropdownIndicator,
        }}
        onChange={setValue}
      />
    </div>
  )
}
```

## Стилизация

Компонент использует следующие CSS-классы для стилизации:

| Класс                   | Описание                                         |
| ----------------------- | ------------------------------------------------ |
| `root`                  | Стиль основного контейнера                       |
| `label`                 | Стиль для подписи селекта                        |
| `selectButton`          | Стиль для кнопки селекта                         |
| `selectButtonFocused`   | Стиль для кнопки селекта при фокусе              |
| `selectButtonValueEmpty`| Стиль для кнопки селекта без выбранного значения |
| `selectButtonError`     | Стиль для кнопки селекта с ошибкой               |
| `selectButtonDisabled`  | Стиль для отключенной кнопки селекта             |
| `dropdown`              | Стиль для выпадающего списка                     |
| `list`                  | Стиль для списка опций                           |
| `errorIcon`             | Стиль для иконки ошибки                          |
| `dropdownIndicator`     | Стиль для иконки раскрытия списка                |
| `valueContainer`        | Стиль для контейнера выбранного значения         |
| `value`                 | Стиль для выбранного значения                    |
| `placeholder`           | Стиль для плейсхолдера                           |
| `helperText`            | Стиль для вспомогательного текста                | 