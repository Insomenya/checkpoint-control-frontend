# Underlay

Underlay — это компонент, поверх которого выстраиваются все остальные компоненты пользовательского интерфейса.
Компонент имеет набор цветов для заливки и обводки: `error`, `warning`, `success`, `info`, `neutral`.
Также можно использовать любой нужный цвет.

## Импорт

```tsx
import { Underlay } from '@v-uik/base'
```

или

```tsx
import { Underlay } from '@v-uik/underlay'
```

## API

| Свойство  | Тип                                                    | По умолчанию  | Описание                           |
| --------- | ------------------------------------------------------ | ------------- | ---------------------------------- |
| `classes` | `UnderlayClasses`                                      | -             | CSS классы компонента              |
| `kind`    | `"filled"` \| `"outlined"`                             | `"filled"`    | Отображение компонента underlay    |
| `status`  | `"neutral"` \| `"error"` \| `"warning"` \| `"info"` \| `"success"` | `"neutral"` | Статус компонента             |
| `color`   | `React.CSSProperties['color']`                         | -             | Цвет underlay                      |
| `as`      | `React.ElementType`                                    | `div`         | HTML-тег, отображаемый компонентом |

## Примеры использования

### Базовый пример

```tsx
import React from 'react'
import { Underlay } from '@v-uik/underlay'

const Component = () => {
  return <Underlay>Underlay content</Underlay>
}
```

### С заливкой

Underlay c kind = `filled`.

```tsx
import React from 'react'
import { Underlay, Text } from '@v-uik/base'

const FilledExample = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Underlay kind="filled" status="error">
        <Text>error filled</Text>
      </Underlay>
      <Underlay kind="filled" status="warning">
        <Text>warning filled</Text>
      </Underlay>
      <Underlay kind="filled" status="success">
        <Text>success filled</Text>
      </Underlay>
      <Underlay kind="filled" status="info">
        <Text>info filled</Text>
      </Underlay>
      <Underlay kind="filled" status="neutral">
        <Text>neutral filled</Text>
      </Underlay>
    </div>
  )
}
```

### С обводкой

Underlay c kind = `outlined`.

```tsx
import React from 'react'
import { Underlay, Text } from '@v-uik/base'

const OutlinedExample = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Underlay kind="outlined" status="error">
        <Text>error outlined</Text>
      </Underlay>
      <Underlay kind="outlined" status="warning">
        <Text>warning outlined</Text>
      </Underlay>
      <Underlay kind="outlined" status="success">
        <Text>success outlined</Text>
      </Underlay>
      <Underlay kind="outlined" status="info">
        <Text>info outlined</Text>
      </Underlay>
      <Underlay kind="outlined" status="neutral">
        <Text>neutral outlined</Text>
      </Underlay>
    </div>
  )
}
```

### Произвольный цвет

Через свойство `color` можно задать произвольный цвет компонента.

```tsx
import React from 'react'
import { Underlay, Text } from '@v-uik/base'

const CustomColorExample = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Underlay kind="filled" color="#6200ee">
        <Text>Custom color filled</Text>
      </Underlay>
      <Underlay kind="outlined" color="#6200ee">
        <Text>Custom color outlined</Text>
      </Underlay>
    </div>
  )
}
```

## Стилизация

Компонент использует следующие CSS-классы для стилизации:

| Класс          | Описание                                 |
| -------------- | ---------------------------------------- |
| `root`         | Корневой элемент компонента              |
| `content`      | Контент внутри underlay                  |
| `outlined`     | Стиль с обводкой                         |
| `outlinedError`| Стиль с обводкой статуса error           |
| `outlinedWarning`| Стиль с обводкой статуса warning       |
| `outlinedSuccess`| Стиль с обводкой статуса success       |
| `outlinedInfo` | Стиль с обводкой статуса info            |
| `outlinedNeutral`| Стиль с обводкой статуса neutral       |
| `filled`       | Стиль с заливкой                         |
| `filledError`  | Стиль с заливкой статуса error           |
| `filledWarning`| Стиль с заливкой статуса warning         |
| `filledSuccess`| Стиль с заливкой статуса success         |
| `filledInfo`   | Стиль с заливкой статуса info            |
| `filledNeutral`| Стиль с заливкой статуса neutral         | 