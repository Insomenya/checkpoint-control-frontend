# Badge

Badge генерирует маленький значок в углу своего дочернего элемента.

## Импорт

```tsx
import { Badge } from '@v-uik/base'
```

или

```tsx
import { Badge } from '@v-uik/badge'
```

## API

| Свойство           | Тип                                          | По умолчанию  | Описание                                                   |
| ------------------ | -------------------------------------------- | ------------- | ---------------------------------------------------------- |
| `classes`          | `Classes`                                    | -             | JSS-классы для стилизации                                 |
| `dot`              | `boolean`                                    | `false`       | Отображает значок как цветную точку без контента          |
| `status`           | `'error'` \| `'success'` \| `'neutral'` \| `'info'` \| `'warning'` \| `'disabled'` | `'error'` | Цветовая схема значка |
| `position`         | `'top-left'` \| `'top-right'` \| `'bottom-left'` \| `'bottom-right'` \| `{ vertical: 'top' \| 'bottom', horizontal: 'left' \| 'right' }` | `{ vertical: 'top', horizontal: 'right' }` | Положение значка относительно дочернего элемента |
| `content`          | `React.ReactNode`                            | -             | Контент, который отображается внутри значка                |
| `max`              | `number`                                     | `99`          | Верхняя граница для числового значения значка             |
| `showZero`         | `boolean`                                    | `false`       | Включает отображение значка при пустом значении          |
| `disabled`         | `boolean`                                    | `false`       | Состояние активности элемента                             |
| `horizontalOffset` | `string` \| `number`                         | `0`           | Смещение положения значка по горизонтали                  |
| `verticalOffset`   | `string` \| `number`                         | `0`           | Смещение положения значка по вертикали                    |

## Примеры использования

### Базовый пример

```tsx
import React from 'react'
import { Badge } from '@v-uik/base'

const BasicExample = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Badge content={1} />
    <Badge content={1} status="error" />
    <Badge content={1} status="info" />
    <Badge content={1} status="neutral" />
    <Badge content={1} status="warning" />
    <Badge content={1} status="success" />
    <Badge disabled content={1} />
  </div>
)
```

### Использование с кнопкой

```tsx
import React from 'react'
import { Badge, Button } from '@v-uik/base'

const ButtonBadgeExample = () => (
  <div style={{ display: 'flex', alignItems: 'baseline' }}>
    <Badge content={10}>
      <Button>Notifications</Button>
    </Badge>
    <Badge content={10} status="success">
      <Button kind="outlined">Notifications</Button>
    </Badge>
    <Badge content={10} status="error">
      <Button kind="ghost">Notifications</Button>
    </Badge>
  </div>
)
```

### Ограничение максимального значения

Если содержимое числовое и превышает значение `max`, то будет отображено `max+`.

```tsx
import React from 'react'
import { Badge, Button } from '@v-uik/base'

const ExceedingMaxValueExample = () => (
  <Badge content={10} max={9}>
    <Button>Notifications</Button>
  </Badge>
)
```

### Всегда видимый

Даже если контент пустой (0, undefined, null, '', false), Badge будет показан, если указан `showZero`.

```tsx
import React from 'react'
import { Badge } from '@v-uik/base'

const AlwaysVisibleExample = () => (
  <Badge showZero content={0}>
    <div
      style={{
        height: '40px',
        width: '40px',
        backgroundColor: 'bisque',
      }}
    />
  </Badge>
)
```

### Точечный индикатор

Можно отображать Badge в виде небольшой точки с помощью свойства `dot`.

```tsx
import React from 'react'
import { Badge } from '@v-uik/base'

const DotBadgeExample = () => (
  <div style={{ display: 'flex', alignItems: 'baseline' }}>
    <Badge dot content={1}>
      <div
        style={{
          height: '40px',
          width: '40px',
          backgroundColor: 'bisque',
        }}
      />
    </Badge>
    <Badge dot showZero>
      <div
        style={{
          height: '40px',
          width: '40px',
          backgroundColor: 'bisque',
        }}
      />
    </Badge>
  </div>
)
```

### Расположение значка

Значок можно расположить в любом из четырех углов дочернего элемента.

```tsx
import React from 'react'
import { Badge } from '@v-uik/base'

const BadgeAlignExample = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Badge content={1} position="top-right">
      <div
        style={{
          height: '40px',
          width: '40px',
          backgroundColor: 'bisque',
        }}
      />
    </Badge>
    <Badge content={1} position="bottom-right">
      <div
        style={{
          height: '40px',
          width: '40px',
          backgroundColor: 'bisque',
        }}
      />
    </Badge>
    <Badge content={1} position="top-left">
      <div
        style={{
          height: '40px',
          width: '40px',
          backgroundColor: 'bisque',
        }}
      />
    </Badge>
    <Badge content={1} position="bottom-left">
      <div
        style={{
          height: '40px',
          width: '40px',
          backgroundColor: 'bisque',
        }}
      />
    </Badge>
  </div>
)
```

Также можно указать положение через объект:

```tsx
import React from 'react'
import { Badge } from '@v-uik/base'

const CustomPositionExample = () => (
  <Badge 
    content={1} 
    position={{ 
      vertical: 'top', 
      horizontal: 'right' 
    }}
    horizontalOffset={5}
    verticalOffset={-5}
  >
    <div style={{ width: 40, height: 40, backgroundColor: 'lightgrey' }} />
  </Badge>
)
```

## Доступность

При использовании Badge для индикации уведомлений рекомендуется добавлять соответствующие ARIA-атрибуты для вспомогательных технологий.

```tsx
import React from 'react'
import { Badge, Button } from '@v-uik/base'

const AccessibleBadgeExample = () => (
  <Badge content={10}>
    <Button aria-label="10 уведомлений">Notifications</Button>
  </Badge>
)
```

## Стилизация

Компонент Badge использует следующие CSS-классы для стилизации:

| Класс        | Описание                                                 |
| ------------ | -------------------------------------------------------- |
| `badge`      | Стиль, применяемый к элементу счётчику                   |
| `show`       | Стиль, применяемый к элементу при свойстве `showZero=true` |
| `badgeRoot`  | Стиль, применяемый к обертке элемента                    |
| `top`        | Стиль, применяемый к элементу с `position='top'`         |
| `bottom`     | Стиль, применяемый к элементу с `position='bottom'`      |
| `left`       | Стиль, применяемый к элементу с `position='left'`        |
| `right`      | Стиль, применяемый к элементу с `position='right'`       |
| `success`    | Стиль, применяемый к элементу с `status='success'`       |
| `error`      | Стиль, применяемый к элементу с `status='error'`         |
| `neutral`    | Стиль, применяемый к элементу с `status='neutral'`       |
| `info`       | Стиль, применяемый к элементу с `status='info'`          |
| `warning`    | Стиль, применяемый к элементу с `status='warning'`       |
| `disabled`   | Стиль, применяемый к элементу с `disabled='true'` или `status='disabled'` |
| `dot`        | Стиль, применяемый к элементу с `dot='true'`             | 