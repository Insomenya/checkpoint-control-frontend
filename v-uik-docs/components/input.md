# Input

Компонент поля ввода текста, который включает в себя InputBase, InputLabel и InputHelperText.

## Импорт

```jsx
import { Input } from '@v-uik/input'
```

или

```jsx
import { Input } from '@v-uik/base'
```

## API

### Свойства компонента

| Свойство          | Тип                                          | По умолчанию | Описание                                    |
| ----------------- | -------------------------------------------- | ------------ | ------------------------------------------- |
| `label`           | `React.ReactNode`                            | -            | Подпись над полем ввода                     |
| `labelProps`      | `InputLabelProps`                            | -            | Свойства компонента InputLabel              |
| `helperText`      | `React.ReactNode`                            | -            | Подпись под полем ввода                     |
| `helperTextProps` | `InputHelperTextProps`                       | -            | Свойства компонента InputHelperText         |
| `value`           | `string \| number \| null`                   | -            | Значение поля                               |
| `onChange`        | `(value: string, event: Event) => void`      | -            | Обработчик изменения значения поля          |
| `inputProps`      | `React.InputHTMLAttributes<HTMLInputElement>`| -            | Атрибуты тега input                         |
| `inputRef`        | `React.Ref<HTMLInputElement>`                | -            | Ссылка на элемент input                     |
| `fullWidth`       | `boolean`                                    | `false`      | Растянуть компонент на всю ширину контейнера|
| `error`           | `boolean`                                    | `false`      | Флаг состояния ошибки                      |
| `size`            | `'sm' \| 'md' \| 'lg'`                      | `'md'`       | Размер поля                                |
| `prefix`          | `React.ReactNode`                            | -            | Вспомогательный элемент перед текстовым полем |
| `suffix`          | `React.ReactNode`                            | -            | Вспомогательный элемент после текстового поля |
| `disabled`        | `boolean`                                    | `false`      | Флаг отключения поля                        |
| `placeholder`     | `string`                                     | -            | Плейсхолдер поля ввода                      |
| `showErrorIcon`   | `boolean`                                    | `true`       | Флаг показа стандартной иконки в состоянии ошибки |
| `showCount`       | `boolean`                                    | `false`      | Показывать ли счетчик введенных символов    |
| `canClear`        | `boolean`                                    | `false`      | Можно ли очищать всё поле                   |
| `clearIcon`       | `React.ReactNode`                            | -            | Иконка для кнопки очистки поля              |
| `onClear`         | `() => void`                                 | -            | Обработчик нажатия на кнопку очистки поля   |
| `ellipsis`        | `boolean`                                    | `false`      | Использовать ли text-overflow: ellipsis     |
| `classes`         | `Partial<Classes>`                           | -            | CSS классы для стилизации                   |

Также доступны все атрибуты нативного элемента `div` и дополнительные атрибуты для вложенных компонентов.

## Примеры использования

### Базовое использование

```jsx
import { Input } from '@v-uik/input'
import { useState } from 'react'

export const BasicInput = () => {
  const [value, setValue] = useState('')

  return (
    <Input
      label="Имя пользователя"
      labelProps={{
        htmlFor: 'username-input',
      }}
      inputProps={{
        id: 'username-input',
      }}
      value={value}
      onChange={setValue}
      helperText="Введите ваше имя пользователя"
    />
  )
}
```

### Обязательное поле ввода

```jsx
import { Input } from '@v-uik/input'
import { useState } from 'react'

export const RequiredInput = () => {
  const [value, setValue] = useState('')

  return (
    <Input
      label="Email"
      required
      value={value}
      onChange={setValue}
      placeholder="example@email.com"
    />
  )
}
```

### Поле ввода с подсчетом символов

```jsx
import { Input } from '@v-uik/input'
import { useState } from 'react'

export const InputWithCounter = () => {
  const [value, setValue] = useState('')

  return (
    <Input
      label="Сообщение"
      showCount
      value={value}
      onChange={setValue}
      inputProps={{
        maxLength: 100,
      }}
    />
  )
}
```

### Поле ввода с кнопкой очистки

```jsx
import { Input } from '@v-uik/input'
import { useState } from 'react'

export const InputWithClear = () => {
  const [value, setValue] = useState('')

  return (
    <Input
      label="Поисковый запрос"
      value={value}
      onChange={setValue}
      canClear
      placeholder="Введите поисковый запрос"
    />
  )
}
```

### Поле ввода с индикацией ошибки

```jsx
import { Input } from '@v-uik/input'
import { useState } from 'react'

export const InputWithError = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (newValue) => {
    setValue(newValue)
    if (newValue.length < 3) {
      setError(true)
      setErrorMessage('Минимальная длина - 3 символа')
    } else {
      setError(false)
      setErrorMessage('')
    }
  }

  return (
    <Input
      label="Имя пользователя"
      value={value}
      onChange={handleChange}
      error={error}
      helperText={errorMessage}
    />
  )
}
```

### Разные размеры полей ввода

```jsx
import { Input } from '@v-uik/input'

export const InputSizes = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Input label="Small input" size="sm" placeholder="Small" />
      <Input label="Medium input" size="md" placeholder="Medium" />
      <Input label="Large input" size="lg" placeholder="Large" />
    </div>
  )
}
``` 