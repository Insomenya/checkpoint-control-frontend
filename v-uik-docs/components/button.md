# Button

Кнопки позволяют пользователям выполнять действия и делать выбор одним нажатием.

## Импорт

```jsx
import { Button } from '@v-uik/button'
```

или

```jsx
import { Button } from '@v-uik/base'
```

## API

### Свойства компонента

| Свойство     | Тип                                  | По умолчанию  | Описание                                        |
| ------------ | ------------------------------------ | ------------- | ----------------------------------------------- |
| `kind`       | `'contained' \| 'ghost' \| 'outlined'` | `'contained'` | Тип кнопки                                      |
| `color`      | `'primary' \| 'secondary' \| 'error'`  | `'primary'`   | Цветовая схема кнопки                           |
| `size`       | `'sm' \| 'md' \| 'lg'`                 | `'md'`        | Размер кнопки                                   |
| `fullWidth`  | `boolean`                            | `false`       | Растянуть кнопку во всю ширину контейнера       |
| `disabled`   | `boolean`                            | `false`       | Делает кнопку неактивной                        |
| `prefixIcon` | `ReactNode`                          | -             | Вспомогательный компонент перед дочерним `JSX`  |
| `suffixIcon` | `ReactNode`                          | -             | Вспомогательный компонент после дочернего `JSX` |
| `classes`    | `ButtonClasses`                      | -             | CSS классы для стилизации                       |
| `textProps`  | `TextProps`                          | -             | Свойства компонента Text                        |

Также доступны все атрибуты нативного элемента `button`.

## Примеры использования

### Заполненные кнопки (default)

Данный тип кнопок имеет высокий акцент с точки зрения дизайна, т.е. такие кнопки сильно выделяются в пользовательском интерфейсе.

```jsx
import { Button } from '@v-uik/button'

export const FilledButtons = () => {
  return (
    <div style={{ display: 'flex', columnGap: 15 }}>
      <Button>Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="error">Error</Button>
    </div>
  )
}
```

### Контурные кнопки

```jsx
import { Button } from '@v-uik/button'

export const OutlinedButtons = () => {
  return (
    <div style={{ display: 'flex', columnGap: 15 }}>
      <Button kind="outlined">Primary</Button>
      <Button kind="outlined" color="secondary">
        Secondary
      </Button>
      <Button kind="outlined" color="error">
        Error
      </Button>
    </div>
  )
}
```

### Текстовые кнопки

```jsx
import { Button } from '@v-uik/button'

export const GhostButtons = () => {
  return (
    <div style={{ display: 'flex', columnGap: 15 }}>
      <Button kind="ghost">Primary</Button>
      <Button kind="ghost" color="secondary">
        Secondary
      </Button>
      <Button kind="ghost" color="error">
        Error
      </Button>
    </div>
  )
}
```

### Кнопки разных размеров

```jsx
import { Button } from '@v-uik/button'

export const DifferentSizeButtons = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', columnGap: 15 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
```

### Кнопки с иконками

```jsx
import { Button } from '@v-uik/button'
import { IconPerson, IconCheck } from '@v-uik/icons'

export const ButtonsWithIcons = () => {
  return (
    <div style={{ display: 'flex', columnGap: 15 }}>
      <Button prefixIcon={<IconPerson />}>С иконкой слева</Button>
      <Button suffixIcon={<IconCheck />}>С иконкой справа</Button>
      <Button prefixIcon={<IconPerson />} suffixIcon={<IconCheck />}>
        С двумя иконками
      </Button>
    </div>
  )
}
```

## Полиморфная кнопка (PolymorphicButton)

Компонент `PolymorphicButton` решает проблему использования кнопки как ссылки или для интеграции с библиотеками маршрутизации.

### Импорт

```jsx
import { PolymorphicButton } from '@v-uik/button'
```

### Использование как ссылка

```jsx
import { PolymorphicButton } from '@v-uik/button'

export const ButtonAsLink = () => {
  return (
    <PolymorphicButton as="a" href="https://example.com" target="_blank">
      Открыть ссылку
    </PolymorphicButton>
  )
}
```

### Использование с React Router

```jsx
import { PolymorphicButton } from '@v-uik/button'
import { Link as RouterLink } from 'react-router-dom'

export const ButtonWithRouter = () => {
  return (
    <PolymorphicButton as={RouterLink} to="/home">
      Перейти на главную
    </PolymorphicButton>
  )
} 