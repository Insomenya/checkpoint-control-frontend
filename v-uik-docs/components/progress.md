# Progress

Компоненты прогресса отображают ход выполнения задачи или загрузки.

## Импорт

```jsx
import { LinearProgress, CircularProgress } from '@v-uik/base'
```

или

```jsx
import { LinearProgress, CircularProgress } from '@v-uik/progress'
```

## API

### LinearProgress API

| Свойство      | Тип                   | По умолчанию | Описание                                        |
| ------------- | --------------------- | ------------ | ----------------------------------------------- |
| `value`       | `number`              | -            | Текущее значение прогресса                      |
| `max`         | `number`              | `100`        | Максимальное значение прогресса                 |
| `hideTrack`   | `boolean`             | `false`      | Скрыть трек (фоновую линию) прогресса           |
| `classes`     | `LinearProgressClasses` | -          | CSS классы для стилизации                       |
| `color`       | `string`              | -            | Цвет прогресс-бара                              |
| `aria-label`  | `string`              | -            | ARIA-атрибут для доступности                    |

Также доступны свойства нативного компонента `div`.

### CircularProgress API

| Свойство                | Тип                      | По умолчанию | Описание                                        |
| ----------------------- | ------------------------ | ------------ | ----------------------------------------------- |
| `value`                 | `number`                 | -            | Текущее значение прогресса                      |
| `max`                   | `number`                 | `100`        | Максимальное значение прогресса                 |
| `size`                  | `'sm' \| 'md' \| 'lg' \| 'xlg'` | `'md'` | Размер индикатора                              |
| `hideTrack`             | `boolean`                | `false`      | Скрыть трек (фоновый круг) прогресса            |
| `color`                 | `string`                 | -            | Цвет прогресс-круга                             |
| `percentageInsideCircle`| `React.ReactNode`        | -            | Содержимое для отображения внутри круга        |
| `thickness`             | `number`                 | -            | Толщина линии прогресса                        |
| `classes`               | `CircularProgressClasses` | -           | CSS классы для стилизации                      |
| `aria-label`            | `string`                 | -            | ARIA-атрибут для доступности                    |

Также доступны свойства нативного компонента `div`.

## Примеры использования

### Базовый пример

```jsx
import React from 'react'
import { LinearProgress, CircularProgress } from '@v-uik/base'

export default () => {
  return (
    <>
      <div style={{ marginBottom: 100 }}>
        <LinearProgress />
      </div>
      <CircularProgress />
    </>
  )
}
```

### Базовый CircularProgress

Компонент CircularProgress может отображаться с треком и без него.

```jsx
import React from 'react'
import { CircularProgress, Text } from '@v-uik/base'

export const BasicProgress = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: 40, textAlign: 'center' }}>
        <Text gutterBottom>With track</Text>
        <CircularProgress size="xlg" />
      </div>
      <div style={{ marginRight: 40, textAlign: 'center' }}>
        <Text gutterBottom>Without track</Text>
        <CircularProgress hideTrack size="xlg" />
      </div>
    </div>
  )
}
```

### Управляемый LineaProgress

Пример управляемого линейного индикатора прогресса с отображением процентов:

```jsx
import * as React from 'react'
import { LinearProgress, useText, createUseStyles, clsx } from '@v-uik/base'

export const ControlledProgress = () => {
  const size = 728
  const [progress, setProgress] = React.useState(500)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const advancement = Math.random() * 8
        if (prev + advancement > size) {
          return 0
        }
        return prev + advancement
      })
    }, 150)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const percentage = Math.ceil((progress / size) * 100)

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 12 }}>
          Main label <span>{percentage}%</span>
        </div>
        <LinearProgress value={progress} max={size} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 12 }}>
          Main label <span>{percentage}%</span>
        </div>
        <LinearProgress hideTrack value={progress} max={size} />
      </div>
    </>
  )
}
```

### Управляемый CircularProgress

Пример управляемого кругового индикатора прогресса разных размеров:

```jsx
import React from 'react'
import { CircularProgress } from '@v-uik/base'

export const ControlledCircularProgress = () => {
  const [progress, setProgress] = React.useState(40)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 20 }}>
          <CircularProgress size="xlg" value={progress} max={100} />
        </div>

        <div style={{ marginRight: 20 }}>
          <CircularProgress size="lg" value={progress} max={100} />
        </div>

        <div style={{ marginRight: 20 }}>
          <CircularProgress size="md" value={progress} max={100} />
        </div>

        <div style={{ marginRight: 20 }}>
          <CircularProgress size="sm" value={progress} max={100} />
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <label>
          percent:
          <input
            style={{ marginLeft: 5 }}
            type="number"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
        </label>
      </div>
    </>
  )
}
```

### CircularProgress с текстом внутри

```jsx
import React from 'react'
import { CircularProgress } from '@v-uik/base'

export const CircularWithLabel = () => {
  const [progress, setProgress] = React.useState(40)
  const percentage = Math.round((progress / 100) * 100)

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <CircularProgress 
        size="xlg" 
        value={progress} 
        max={100} 
        percentageInsideCircle={`${percentage}%`}
      />
    </div>
  )
}
```

### Разные цвета

Вы можете настроить цвет прогресс-бара, используя свойство `color`.

```jsx
import React from 'react'
import { LinearProgress, CircularProgress } from '@v-uik/base'

export const DifferentColors = () => {
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <LinearProgress value={50} max={100} color="purple" />
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        <CircularProgress value={50} max={100} color="success" />
        <CircularProgress value={50} max={100} color="error" />
        <CircularProgress value={50} max={100} color="purple" />
      </div>
    </>
  )
}
```

## Доступность

Для обеспечения доступности используйте ARIA-атрибуты, такие как `aria-label`, `aria-valuemin`, `aria-valuemax` и `aria-valuenow`.

```jsx
import React from 'react'
import { LinearProgress } from '@v-uik/base'

export const AccessibleLinearProgress = () => {
  return (
    <LinearProgress
      value={50}
      max={100}
      aria-label="Progress of loading data"
    />
  )
}
```

```jsx
import React from 'react'
import { CircularProgress } from '@v-uik/base'

export const AccessibleCircularProgress = () => {
  return (
    <CircularProgress
      value={50}
      max={100}
      aria-label="Progress of download"
    />
  )
}
``` 