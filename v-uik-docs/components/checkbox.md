# Checkbox

Компонент представляет собой интерактивный элемент флажка (чекбокса) для выбора опций пользователем.

## Импорт

```jsx
import { Checkbox } from '@v-uik/checkbox'
```

или

```jsx
import { Checkbox } from '@v-uik/base'
```

## API

### Свойства компонента Checkbox

| Свойство        | Тип                                          | По умолчанию | Описание                                     |
| --------------- | -------------------------------------------- | ------------ | -------------------------------------------- |
| `checked`       | `boolean`                                    | `false`      | Флаг выбора чекбокса                         |
| `defaultChecked`| `boolean`                                    | `false`      | Начальное состояние для неконтролируемого режима |
| `disabled`      | `boolean`                                    | `false`      | Флаг отключения чекбокса                     |
| `indeterminate` | `boolean`                                    | `false`      | Флаг неопределенного состояния               |
| `name`          | `string`                                     | -            | Атрибут name элемента input                  |
| `onChange`      | `(event: React.ChangeEvent<HTMLInputElement>) => void` | - | Обработчик изменения состояния               |
| `inputProps`    | `React.InputHTMLAttributes<HTMLInputElement>`| -            | Атрибуты для элемента input                  |
| `classes`       | `Partial<Classes>`                           | -            | CSS классы для стилизации                    |

Также доступны все атрибуты нативного элемента `label`.

### Свойства для стилизации (Classes)

| Класс          | Описание                                    |
| -------------- | ------------------------------------------- |
| `control`      | Стиль, применяемый к обертке основного элемента |
| `indeterminate`| Стиль, применяемый к элементу с `indeterminate='true'` |
| `disabled`     | Стиль, применяемый к элементу с `disabled='true'` |
| `checked`      | Стиль, применяемый к элементу с `checked='true'` |
| `input`        | Стиль, применяемый к элементу `input`      |
| `checkbox`     | Стиль, применяемый к обертке иконки выбора |
| `checkboxIcon` | Стиль, применяемый к иконке выбора         |

## Примеры использования

### Базовое использование

```jsx
import { Checkbox } from '@v-uik/checkbox'
import { useState } from 'react'

export const BasicCheckbox = () => {
  const [checked, setChecked] = useState(false)

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <Checkbox 
      checked={checked} 
      onChange={handleChange} 
    />
  )
}
```

### Использование с меткой (LabelControl)

Для добавления текстовой метки к чекбоксу рекомендуется использовать компонент `LabelControl`:

```jsx
import { Checkbox } from '@v-uik/checkbox'
import { LabelControl } from '@v-uik/label-control'
import { useState } from 'react'

export const CheckboxWithLabel = () => {
  const [checked, setChecked] = useState(false)

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <LabelControl
      label="Согласен с условиями использования"
      control={<Checkbox checked={checked} onChange={handleChange} />}
    />
  )
}
```

### Неопределенное состояние

Чекбокс может иметь промежуточное (indeterminate) состояние, когда не все вложенные опции выбраны:

```jsx
import { Checkbox } from '@v-uik/checkbox'
import { LabelControl } from '@v-uik/label-control'
import { useState } from 'react'

export const IndeterminateCheckbox = () => {
  const [checkedItems, setCheckedItems] = useState([true, false])
  
  const allChecked = checkedItems.every(Boolean)
  const indeterminate = checkedItems.some(Boolean) && !allChecked

  const handleParentChange = (event) => {
    const newValue = event.target.checked
    setCheckedItems(checkedItems.map(() => newValue))
  }

  const handleChildChange = (index) => (event) => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems[index] = event.target.checked
    setCheckedItems(newCheckedItems)
  }

  return (
    <div>
      <LabelControl
        label="Родительский элемент"
        control={
          <Checkbox 
            checked={allChecked} 
            indeterminate={indeterminate}
            onChange={handleParentChange} 
          />
        }
      />
      <div style={{ marginLeft: 24 }}>
        <LabelControl
          label="Опция 1"
          control={
            <Checkbox 
              checked={checkedItems[0]} 
              onChange={handleChildChange(0)} 
            />
          }
        />
        <LabelControl
          label="Опция 2"
          control={
            <Checkbox 
              checked={checkedItems[1]} 
              onChange={handleChildChange(1)} 
            />
          }
        />
      </div>
    </div>
  )
}
```

### Группа чекбоксов (CheckboxGroup)

Компонент `CheckboxGroup` позволяет управлять группой чекбоксов:

```jsx
import { Checkbox, CheckboxGroup } from '@v-uik/checkbox'
import { LabelControl } from '@v-uik/label-control'
import { useState } from 'react'

export const CheckboxGroupExample = () => {
  const [values, setValues] = useState(['option1'])

  const handleChange = (event) => {
    const { checked, name } = event.target
    
    if (checked) {
      setValues([...values, name])
    } else {
      setValues(values.filter(value => value !== name))
    }
  }

  return (
    <CheckboxGroup 
      label="Выберите опции" 
      value={values} 
      onChange={handleChange}
    >
      <LabelControl
        name="option1"
        control={<Checkbox />}
        label="Опция 1"
      />
      <LabelControl
        name="option2"
        control={<Checkbox />}
        label="Опция 2"
      />
      <LabelControl
        name="option3"
        control={<Checkbox />}
        label="Опция 3"
      />
    </CheckboxGroup>
  )
}
```

### Неконтролируемый режим

```jsx
import { Checkbox, CheckboxGroup } from '@v-uik/checkbox'
import { LabelControl } from '@v-uik/label-control'

export const UncontrolledCheckbox = () => {
  return (
    <div>
      <LabelControl
        label="Неконтролируемый чекбокс"
        control={<Checkbox defaultChecked />}
      />
      
      <CheckboxGroup 
        label="Неконтролируемая группа" 
        defaultValue={['option1', 'option3']}
      >
        <LabelControl
          name="option1"
          control={<Checkbox />}
          label="Опция 1"
        />
        <LabelControl
          name="option2"
          control={<Checkbox />}
          label="Опция 2"
        />
        <LabelControl
          name="option3"
          control={<Checkbox />}
          label="Опция 3"
        />
      </CheckboxGroup>
    </div>
  )
}
``` 