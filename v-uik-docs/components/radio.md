# Radio

Радиокнопки позволяют пользователю выбрать один вариант из набора.

## Импорт

```tsx
import { Radio, RadioGroup } from '@v-uik/base'
```

или

```tsx
import { Radio } from '@v-uik/radio'
import { RadioGroup } from '@v-uik/radio-group'
```

## Radio API

| Свойство       | Тип                                                           | По умолчанию | Описание                                 |
| -------------- | ------------------------------------------------------------- | ------------ | ---------------------------------------- |
| `classes`      | `Classes`                                                     | -            | JSS-классы для стилизации               |
| `checked`      | `boolean`                                                     | `false`      | Показывает выбран ли компонент          |
| `defaultChecked` | `boolean`                                                   | -            | Изначальное значение выбора             |
| `disabled`     | `boolean`                                                     | `false`      | Элемент отключен                         |
| `inputProps`   | `React.InputHTMLAttributes<HTMLInputElement>`                 | -            | Атрибуты нативного элемента input       |
| `name`         | `string`                                                      | -            | Атрибут name элемента input              |
| `value`        | `string`                                                      | -            | Значение поля input                      |
| `onChange`     | `(value: string, event: React.ChangeEvent<HTMLInputElement>) => void` | -  | Обработчик, вызываемый при изменении состояния |

## RadioGroup API

| Свойство          | Тип                                                          | По умолчанию    | Описание                              |
| ----------------- | ------------------------------------------------------------ | --------------- | ------------------------------------- |
| `classes`         | `RadioGroupClasses`                                          | -               | JSS-классы для стилизации             |
| `direction`       | `'horizontal'` \| `'vertical'`                               | `'horizontal'`  | Направление расположения элементов     |
| `value`           | `string`                                                     | -               | Значение поля                         |
| `defaultValue`    | `string`                                                     | -               | Значение поля по умолчанию            |
| `onChange`        | `(value: string, event: React.ChangeEvent<HTMLInputElement>) => void` | - | Обработчик изменения поля             |
| `label`           | `React.ReactNode`                                            | -               | Подпись над полем ввода               |
| `labelProps`      | `InputLabelProps`                                            | -               | Свойства компонента InputLabel        |
| `helperText`      | `React.ReactNode`                                            | -               | Подпись под полем ввода               |
| `helperTextProps` | `InputHelperTextProps`                                       | -               | Свойства компонента InputHelperText   |
| `disabled`        | `boolean`                                                    | `false`         | Поле отключено                        |
| `error`           | `boolean`                                                    | `false`         | Поле содержит ошибку                  |
| `name`            | `string`                                                     | -               | Имя группы элементов                  |

## Примеры использования

### Одиночная радиокнопка

```tsx
import React from 'react'
import { Radio } from '@v-uik/radio'

const RadioExample = () => {
  const [checked, setChecked] = React.useState(false)
  
  const handleChange = (value, event) => {
    setChecked(event.target.checked)
  }
  
  return <Radio checked={checked} onChange={handleChange} value="option1" />
}
```

### Неконтролируемая радиокнопка

```tsx
import React from 'react'
import { Radio } from '@v-uik/radio'

const UncontrolledRadioExample = () => {
  return <Radio name="option1" value="value1" />
}
```

### Радиокнопка со значением по умолчанию

```tsx
import React from 'react'
import { Radio } from '@v-uik/radio'

const RadioDefaultValueExample = () => {
  return <Radio defaultChecked name="option1" value="value1" />
}
```

### Группа радиокнопок в горизонтальном расположении

```tsx
import React from 'react'
import { RadioGroup, Radio, LabelControl } from '@v-uik/base'

const HorizontalRadioGroupExample = () => {
  const [value, setValue] = React.useState('')

  return (
    <RadioGroup
      label="Label"
      value={value}
      direction="horizontal"
      name="horizontal-example"
      onChange={setValue}
    >
      <LabelControl value="option1" control={<Radio />} label="Radio label 1" />
      <LabelControl value="option2" control={<Radio />} label="Radio label 2" />
      <LabelControl value="option3" control={<Radio />} label="Radio label 3" />
    </RadioGroup>
  )
}
```

### Группа радиокнопок в вертикальном расположении

```tsx
import React from 'react'
import { RadioGroup, Radio, LabelControl } from '@v-uik/base'

const VerticalRadioGroupExample = () => {
  const [value, setValue] = React.useState('')

  return (
    <RadioGroup
      label="Label"
      value={value}
      direction="vertical"
      name="vertical-example"
      onChange={setValue}
    >
      <LabelControl value="option1" control={<Radio />} label="Radio label 1" />
      <LabelControl value="option2" control={<Radio />} label="Radio label 2" />
      <LabelControl value="option3" control={<Radio />} label="Radio label 3" />
    </RadioGroup>
  )
}
```

### Неконтролируемая группа радиокнопок

```tsx
import React from 'react'
import { RadioGroup, Radio, LabelControl } from '@v-uik/base'

const UncontrolledRadioGroupExample = () => {
  return (
    <RadioGroup label="Label" direction="vertical" name="uncontrolled-example">
      <LabelControl value="option1" control={<Radio />} label="Radio label 1" />
      <LabelControl value="option2" control={<Radio />} label="Radio label 2" />
      <LabelControl value="option3" control={<Radio />} label="Radio label 3" />
    </RadioGroup>
  )
}
```

### Группа радиокнопок со значением по умолчанию

```tsx
import React from 'react'
import { RadioGroup, Radio, LabelControl } from '@v-uik/base'

const RadioGroupDefaultValueExample = () => {
  return (
    <RadioGroup 
      label="Label" 
      direction="vertical" 
      defaultValue="option1" 
      name="default-value-example"
    >
      <LabelControl value="option1" control={<Radio />} label="Radio label 1" />
      <LabelControl value="option2" control={<Radio />} label="Radio label 2" />
      <LabelControl value="option3" control={<Radio />} label="Radio label 3" />
    </RadioGroup>
  )
}
```

### Радиокнопки с разным расположением подписей

```tsx
import React from 'react'
import { RadioGroup, Radio, LabelControl } from '@v-uik/base'

const DifferentPositionRadioExample = () => {
  const [value, setValue] = React.useState('')

  return (
    <RadioGroup
      label="Label"
      value={value}
      direction="horizontal"
      name="different-position-example"
      onChange={setValue}
    >
      <LabelControl
        labelPlacement="start"
        value="start"
        control={<Radio />}
        label="Start"
      />
      <LabelControl
        labelPlacement="top"
        value="top"
        control={<Radio />}
        label="Top"
      />
      <LabelControl
        labelPlacement="bottom"
        value="bottom"
        control={<Radio />}
        label="Bottom"
      />
      <LabelControl
        labelPlacement="end"
        value="end"
        control={<Radio />}
        label="End"
      />
    </RadioGroup>
  )
}
```

## Стилизация

### Radio классы

| Класс        | Описание                           |
| ------------ | ---------------------------------- |
| `control`    | Корневой элемент радиокнопки        |
| `disabled`   | Стили для отключенного состояния    |
| `input`      | Стили для нативного элемента input  |
| `inputChecked` | Стили для выбранного input         |
| `radio`      | Стили для видимой части радиокнопки |
| `radioMark`  | Стили для метки выбранной радиокнопки |
| `checked`    | Стили для выбранного состояния      |

### RadioGroup классы

| Класс        | Описание                           |
| ------------ | ---------------------------------- |
| `container`  | Корневой элемент группы радиокнопок |
| `error`      | Стили для состояния ошибки         |
| `disabled`   | Стили для отключенного состояния    |
| `radioGroup` | Контейнер для радиокнопок           |
| `vertical`   | Стили для вертикального расположения |
``` 