# LoadingButton

Интерактивный компонент кнопки с поддержкой состояния загрузки.

## Импорт

```jsx
import { LoadingButton } from '@v-uik/base'
```

или

```jsx
import { LoadingButton } from '@v-uik/loading-button'
```

## API

| Свойство         | Тип                               | По умолчанию | Описание                                         |
| ---------------- | --------------------------------- | ------------ | ------------------------------------------------ |
| `isLoading`      | `boolean`                         | `false`      | Флаг отображения загрузки                        |
| `loadingTitle`   | `React.ReactNode`                 | -            | Текст, отображаемый при загрузке                 |
| `hideLoaderPrefix` | `boolean`                       | `false`      | Скрыть индикатор загрузки слева                  |
| `showLoaderSuffix` | `boolean`                       | `false`      | Показать индикатор загрузки справа               |
| `components`     | `Partial<LoadingButtonComponents>` | -           | Свойство для переопределения компонентов         |
| `kind`           | `'contained' \| 'ghost' \| 'outlined'` | `'contained'` | Тип кнопки                                 |
| `color`          | `'primary' \| 'secondary' \| 'error'` | `'primary'` | Цветовая схема кнопки                        |
| `size`           | `'sm' \| 'md' \| 'lg'`            | `'md'`       | Размер кнопки                                    |
| `fullWidth`      | `boolean`                         | `false`      | Растянуть кнопку на всю ширину контейнера        |
| `disabled`       | `boolean`                         | `false`      | Делает кнопку неактивной                         |
| `prefixIcon`     | `ReactNode`                       | -            | Иконка перед текстом                             |
| `suffixIcon`     | `ReactNode`                       | -            | Иконка после текста                              |
| `classes`        | `LoadingButtonClasses`            | -            | CSS классы для стилизации                        |

Также доступны свойства нативного компонента, переданного в свойство `as`, по умолчанию `as=button`.

### Компоненты LoadingButton

Компонент `LoadingButton` позволяет переопределить части своих компонентов с помощью свойства `components`:

| Название         | Тип                       | Описание                                                 |
| ---------------- | ------------------------- | -------------------------------------------------------- |
| `LoaderPrefix`   | `LoaderPrefixProps`       | Компонент индикатора загрузки перед дочерним элементом  |
| `LoaderSuffix`   | `LoaderSuffixProps`       | Компонент индикатора загрузки после дочернего элемента  |

## Примеры использования

### Базовый пример

```jsx
import * as React from 'react'
import { LoadingButton } from '@v-uik/base'

export const Default = () => {
  return (
    <LoadingButton isLoading loadingTitle="Loading...">
      Button
    </LoadingButton>
  )
}
```

### Заполненные кнопки

Пример заполненных (contained) кнопок в состоянии загрузки с разными цветовыми схемами:

```jsx
import React from 'react'
import { LoadingButton } from '@v-uik/base'

export const FilledLoadingButtons = () => {
  return (
    <div style={{ display: 'flex', columnGap: 16 }}>
      <LoadingButton isLoading loadingTitle="Loading...">
        Button
      </LoadingButton>
      <LoadingButton isLoading color="secondary" loadingTitle="Loading...">
        Button
      </LoadingButton>
      <LoadingButton isLoading color="error" loadingTitle="Loading...">
        Button
      </LoadingButton>
      <LoadingButton disabled isLoading loadingTitle="Loading...">
        Button
      </LoadingButton>
    </div>
  )
}
```

### Контурные кнопки

Пример контурных (outlined) кнопок в состоянии загрузки:

```jsx
import React from 'react'
import { LoadingButton } from '@v-uik/base'

export const OutlinedLoadingButtons = () => {
  return (
    <div style={{ display: 'flex', columnGap: 16 }}>
      <LoadingButton kind="outlined" isLoading loadingTitle="Loading...">
        Button
      </LoadingButton>
      <LoadingButton
        kind="outlined"
        color="secondary"
        isLoading
        loadingTitle="Loading..."
      >
        Button
      </LoadingButton>
      <LoadingButton
        kind="outlined"
        color="error"
        isLoading
        loadingTitle="Loading..."
      >
        Button
      </LoadingButton>
    </div>
  )
}
```

### Текстовые кнопки

Пример текстовых (ghost) кнопок в состоянии загрузки:

```jsx
import React from 'react'
import { LoadingButton } from '@v-uik/base'

export const GhostLoadingButtons = () => {
  return (
    <div style={{ display: 'flex', columnGap: 16 }}>
      <LoadingButton kind="ghost" isLoading loadingTitle="Loading...">
        Button
      </LoadingButton>
      <LoadingButton
        kind="ghost"
        color="secondary"
        isLoading
        loadingTitle="Loading..."
      >
        Button
      </LoadingButton>
      <LoadingButton
        kind="ghost"
        color="error"
        isLoading
        loadingTitle="Loading..."
      >
        Button
      </LoadingButton>
    </div>
  )
}
```

### Кнопки разных размеров

```jsx
import React from 'react'
import { LoadingButton } from '@v-uik/base'

export const DifferentSizeLoadingButtons = () => {
  return (
    <div style={{ display: 'flex', columnGap: 16, alignItems: 'center' }}>
      <LoadingButton isLoading size="sm" loadingTitle="Loading...">
        Button
      </LoadingButton>
      <LoadingButton isLoading loadingTitle="Loading...">
        Button
      </LoadingButton>
      <LoadingButton isLoading size="lg" loadingTitle="Loading...">
        Button
      </LoadingButton>
    </div>
  )
}
```

### Пользовательский текст при загрузке

Вы можете указать пользовательский текст для отображения во время загрузки с помощью свойства `loadingTitle`:

```jsx
import * as React from 'react'
import { LoadingButton } from '@v-uik/base'

export const LoadingTitle = () => {
  return (
    <LoadingButton isLoading loadingTitle="In Progress...">
      Button
    </LoadingButton>
  )
}
```

### Настройка отображения индикаторов загрузки

Свойства `hideLoaderPrefix` и `showLoaderSuffix` позволяют настраивать отображение индикаторов загрузки:

```jsx
import React from 'react'
import { LoadingButton } from '@v-uik/base'

export const LoadingSuffix = () => {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {/* Скрыть индикатор слева и показать справа */}
      <LoadingButton
        hideLoaderPrefix
        showLoaderSuffix
        isLoading
        loadingTitle="Loading..."
      >
        Button
      </LoadingButton>
      
      {/* Показать индикатор только справа */}
      <LoadingButton
        isLoading
        showLoaderSuffix
        loadingTitle="Loading..."
      >
        Button
      </LoadingButton>
      
      {/* Показать индикатор только слева (по умолчанию) */}
      <LoadingButton
        isLoading
        loadingTitle="Loading..."
      >
        Button
      </LoadingButton>
    </div>
  )
}
```

### Пользовательские компоненты индикаторов загрузки

Вы можете заменить стандартные индикаторы загрузки своими компонентами:

```jsx
import React from 'react'
import { LoadingButton, CircularProgress } from '@v-uik/base'

// Пользовательский индикатор загрузки слева
const LoaderPrefix = (props) => (
  <CircularProgress
    size="sm"
    color="success"
    style={{ marginRight: 8 }}
    {...props}
  />
)

// Пользовательский индикатор загрузки справа
const LoaderSuffix = (props) => (
  <CircularProgress
    size="sm"
    color="error"
    style={{ marginLeft: 8 }}
    {...props}
  />
)

export const CustomComponents = () => {
  return (
    <LoadingButton
      isLoading
      showLoaderSuffix
      loadingTitle="Loading..."
      components={{ LoaderPrefix, LoaderSuffix }}
    >
      Button
    </LoadingButton>
  )
}
```

## Использование в реальных сценариях

```jsx
import React from 'react'
import { LoadingButton } from '@v-uik/base'

export const SubmitForm = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Имитация асинхронного запроса
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Form submitted successfully!')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <LoadingButton 
      isLoading={isLoading} 
      loadingTitle="Submitting..." 
      onClick={handleSubmit}
    >
      Submit Form
    </LoadingButton>
  )
}
``` 