# Textarea

Компонент ввода многострочного текста.

## Импорт

```tsx
import { Textarea } from '@v-uik/base'
```

или

```tsx
import { Textarea } from '@v-uik/textarea'
```

## API

| Свойство               | Тип                                                           | По умолчанию | Описание                                       |
| ---------------------- | ------------------------------------------------------------- | ------------ | ---------------------------------------------- |
| `classes`              | `Classes`                                                     | -            | JSS-классы для стилизации                      |
| `labelledClasses`      | `LabelledClasses`                                             | -            | Список классов для компонента Labelled         |
| `label`                | `React.ReactNode`                                             | -            | Подпись над полем ввода                        |
| `labelProps`           | `InputLabelProps`                                             | -            | Свойства компонента InputLabel                 |
| `helperText`           | `React.ReactNode`                                             | -            | Подпись под полем ввода                        |
| `helperTextProps`      | `InputHelperTextProps`                                        | -            | Свойства компонента InputHelperText            |
| `textareaProps`        | `React.TextareaHTMLAttributes<HTMLTextAreaElement>`           | -            | Атрибуты тега textarea                         |
| `textareaRef`          | `React.Ref<HTMLTextAreaElement>`                              | -            | Ссылка на элемент textarea                     |
| `rows`                 | `number`                                                      | `3`          | Количество строк                               |
| `fullWidth`            | `boolean`                                                     | `false`      | Растянуть компонент на всю ширину контейнера   |
| `error`                | `boolean`                                                     | `false`      | Поле содержит ошибку                           |
| `disabled`             | `boolean`                                                     | `false`      | Поле заблокировано для ввода                   |
| `placeholder`          | `string`                                                      | -            | Подсказка внутри поля, если не введен текст    |
| `value`                | `string` \| `number` \| `null`                                | -            | Значение поля                                  |
| `defaultValue`         | `string` \| `number` \| `null`                                | -            | Значение по умолчанию для неконтролируемого компонента |
| `onChange`             | `(value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void` | - | Обработчик события изменения значения поля    |
| `resize`               | `'none'` \| `'both'` \| `'horizontal'` \| `'vertical'`        | `'none'`     | Возможность изменения размера поля пользователем |
| `size`                 | `'sm'` \| `'md'` \| `'lg'`                                    | `'md'`       | Размер поля                                    |
| `components`           | `{ Textarea: React.ForwardRefExoticComponent }`               | -            | Кастомный компонент Textarea                   |
| `showCount`            | `boolean`                                                     | `false`      | Показывать ли счетчик введенных символов      |
| `description`          | `React.ReactNode`                                             | -            | Описание под полем ввода                       |
| `keepHelperTextMinHeight` | `boolean`                                                  | `false`      | Сохранять минимальную высоту блока подсказки   |
| `required`             | `boolean`                                                     | `false`      | Обязательное поле                              |

## Примеры использования

### Стандартное поле ввода

```tsx
import * as React from 'react'
import { Textarea } from '@v-uik/base'

const BasicExample = () => {
  const [text, setText] = React.useState<string>('')

  const handleAreaChange = (value: string) => {
    setText(value)
  }

  return (
    <Textarea
      label="Brief description of the area"
      helperText="Additional description of the area"
      placeholder="Ordinary district of Moscow"
      textareaProps={{
        id: 'basic-textarea',
        'aria-labelledby': 'basic-label',
        'aria-describedby': 'basic-helper',
      }}
      labelProps={{ id: 'basic-label', htmlFor: 'basic-textarea' }}
      helperTextProps={{ id: 'basic-helper' }}
      value={text}
      onChange={handleAreaChange}
    />
  )
}
```

### Неконтролируемое состояние

Компонент поддерживает неконтролируемое состояние. Чтобы активировать его, не передавайте в `Textarea` свойство `value`.

```tsx
import React from 'react'
import { Textarea } from '@v-uik/base'

const TextareaUncontrolledExample = () => {
  return (
    <Textarea
      label="Brief description of the area"
      helperText="Additional description of the area"
      placeholder="Ordinary district of Moscow"
      textareaProps={{
        id: 'basic-textarea',
        'aria-labelledby': 'basic-label',
        'aria-describedby': 'basic-helper',
      }}
      labelProps={{ id: 'basic-label', htmlFor: 'basic-textarea' }}
      helperTextProps={{ id: 'basic-helper' }}
    />
  )
}
```

### Со значением по умолчанию

```tsx
import React from 'react'
import { Textarea } from '@v-uik/base'

const TextareaDefaultValueExample = () => {
  return (
    <Textarea
      label="Brief description of the area"
      helperText="Additional description of the area"
      placeholder="Ordinary district of Moscow"
      textareaProps={{
        id: 'basic-textarea',
        'aria-labelledby': 'basic-label',
        'aria-describedby': 'basic-helper',
      }}
      labelProps={{ id: 'basic-label', htmlFor: 'basic-textarea' }}
      helperTextProps={{ id: 'basic-helper' }}
      defaultValue="default text"
    />
  )
}
```

### С ошибкой

```tsx
import * as React from 'react'
import { Textarea } from '@v-uik/base'

const WithErrorExample = () => {
  return (
    <Textarea
      error
      label="Brief description of the area"
      helperText="Additional description of the area"
      value="Ordinary district of Moscow"
      textareaProps={{
        'aria-labelledby': 'with-error-label',
        'aria-describedby': 'with-error-helper',
        'aria-invalid': true,
      }}
      labelProps={{ id: 'with-error-label' }}
      helperTextProps={{ id: 'with-error-helper' }}
    />
  )
}
```

### С возможностью изменения размера пользователем

```tsx
import * as React from 'react'
import { createUseStyles, Textarea } from '@v-uik/base'

const useStyles = createUseStyles({
  textarea: {
    maxWidth: 250,
    maxHeight: 150,
  },
})

const TextareaUserResizeExample = () => {
  const [text, setText] = React.useState<string>('')
  const classes = useStyles()

  return (
    <Textarea
      classes={classes}
      label="Label"
      helperText="Helper Text"
      placeholder="Resize..."
      resize="both"
      value={text}
      onChange={setText}
    />
  )
}
```

### С авто-изменением размера

```tsx
import * as React from 'react'
import { Textarea } from '@v-uik/base'
import { default as CustomTextarea } from 'react-textarea-autosize'

const TextareaAutosizeExample = () => {
  const [text, setText] = React.useState<string>('')

  return (
    <Textarea
      label="Label"
      helperText="Helper Text"
      placeholder="Autosize..."
      components={{ Textarea: CustomTextarea }}
      textareaProps={{ minRows: 1, maxRows: 3 }}
      value={text}
      onChange={setText}
    />
  )
}
```

## Стилизация

Компонент использует следующие CSS-классы для стилизации:

| Класс                   | Описание                                        |
| ----------------------- | ----------------------------------------------- |
| `container`             | Стиль, применяемый к обертке                    |
| `textareaContainer`     | Стиль, применяемый к контейнеру поля ввода      |
| `textarea`              | Стиль, применяемый к элементу ввода             |
| `textareaSmall`         | Стиль, применяемый к элементу ввода с `size='sm` |
| `textareaMedium`        | Стиль, применяемый к элементу ввода с `size='md` |
| `textareaLarge`         | Стиль, применяемый к элементу ввода с `size='lg` |
| `error`                 | Стиль, применяемый к элементу с `error='true'`   |
| `disabled`              | Стиль, применяемый к элементу с `disabled='true'` |
| `focused`               | Стиль, применяемый к элементу в момент фокуса    |
| `textareaContainerFocused` | Стиль контейнера при фокусе                   |
| `textareaContainerDisabled` | Стиль контейнера при отключенном состоянии   |
| `textareaContainerError` | Стиль контейнера при ошибке                     |
| `resizeNone`            | Стиль для элемента без возможности изменения размера |
| `resizeBoth`            | Стиль для элемента с возможностью изменения размера по горизонтали и вертикали |
| `resizeHorizontal`      | Стиль для элемента с возможностью изменения размера по горизонтали |
| `resizeVertical`        | Стиль для элемента с возможностью изменения размера по вертикали |
| `fullWidth`             | Стиль, применяемый при `fullWidth='true'`         | 