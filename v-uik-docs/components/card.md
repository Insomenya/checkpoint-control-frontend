# Card

Компонент Card объединяет контент и действия в одном компоненте, создавая визуально выделенный блок информации.

## Импорт

```jsx
import { Card } from '@v-uik/base'
```

или

```jsx
import { Card } from '@v-uik/card'
```

## API

| Свойство       | Тип                                            | По умолчанию   | Описание                                            |
| -------------- | ---------------------------------------------- | -------------- | --------------------------------------------------- |
| `kind`         | `'container' \| 'clickable' \| 'selectable'`   | `'container'`  | Тип карточки                                        |
| `header`       | `React.ReactNode`                              | -              | Заголовок карточки                                  |
| `onClick`      | `(event: React.MouseEvent) => void`            | -              | Обработчик клика (для kind="clickable")             |
| `checked`      | `boolean`                                      | `false`        | Состояние выбора (для kind="selectable")            |
| `onChange`     | `(event: React.ChangeEvent<HTMLInputElement>) => void` | -     | Обработчик изменения выбора (для kind="selectable") |
| `name`         | `string`                                       | -              | Имя группы (для kind="selectable")                  |
| `disabled`     | `boolean`                                      | `false`        | Блокировка взаимодействия                           |
| `inputProps`   | `object`                                       | -              | Свойства для input (для kind="selectable")          |
| `inputWrapperProps` | `object`                                  | -              | Свойства для обертки input (для kind="selectable")  |
| `buttonProps`  | `object`                                       | -              | Свойства для кнопки (для kind="clickable")          |
| `classes`      | `CardClasses`                                  | -              | CSS классы для стилизации                           |

Также доступны свойства нативного компонента `div` кроме `'onChange' | 'checked' | 'onClick' | 'name' | 'disabled'`.

## Примеры использования

### Базовый пример

```jsx
import React from 'react'
import { Card, Text } from '@v-uik/base'

export default () => {
  return (
    <Card>
      <Text>
        Простая карточка с текстовым содержимым. Card объединяет контент 
        и действия в одном компоненте.
      </Text>
    </Card>
  )
}
```

### Типы карточек

С помощью свойства `kind` можно выбрать тип карточки:

```jsx
import React from 'react'
import { Card, Text } from '@v-uik/base'

export const CardsKind = () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <div
      style={{
        width: 382,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Стандартная карточка-контейнер */}
      <Card kind="container" header="Container Card">
        <Text kind="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
        </Text>
      </Card>

      {/* Кликабельная карточка */}
      <Card
        kind="clickable"
        header="Clickable Card"
        onClick={(e) => console.log('Card clicked', e)}
      >
        <Text kind="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
        </Text>
      </Card>

      {/* Карточка с выбором (как чекбокс) */}
      <Card
        kind="selectable"
        checked={checked}
        header="Selectable Card"
        onChange={(e) => setChecked(e.target.checked)}
      >
        <Text kind="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
        </Text>
      </Card>
    </div>
  )
}
```

### Карточка с одиночным выбором (radio)

Пример карточек, работающих как radio-кнопки:

```jsx
import React from 'react'
import { Card, Radio, Text, createUseStyles } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  subtitle: {
    color: theme.sys.color.onBackgroundMedium,
  },
  content: {
    marginTop: 8,
  },
  container: {
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
  },
  mainContent: {
    flex: 1,
  },
  card: {
    marginBottom: 20,
  },
}))

export const RadioCard = () => {
  const [selected, setSelected] = React.useState('1')
  const styles = useStyles()

  const cards = [
    {
      title: 'Вариант 1',
      id: '1',
      content: 'Описание первого варианта',
    },
    {
      title: 'Вариант 2',
      id: '2',
      content: 'Описание второго варианта',
    },
    {
      title: 'Вариант 3',
      id: '3',
      content: 'Описание третьего варианта',
    },
  ]

  return (
    <div style={{ width: 600, margin: 'auto' }}>
      {cards.map(({ id, content, title }) => (
        <Card
          key={id}
          inputProps={{ type: 'radio' }}
          className={styles.card}
          kind="selectable"
          name="options"
          checked={selected === id}
          onChange={() => setSelected(id)}
        >
          <div className={styles.container}>
            <Radio
              inputProps={{ tabIndex: -1 }}
              checked={selected === id}
              onChange={() => {
                setSelected(id)
              }}
            />
            <div className={styles.mainContent}>
              <Text kind="titleLg">{title}</Text>
              <Text kind="body2" className={styles.subtitle}>
                Подзаголовок
              </Text>
              <Text kind="bodyMd" className={styles.content}>
                {content}
              </Text>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
```

### Карточка с мультивыбором (checkbox)

Пример карточек, работающих как чекбоксы:

```jsx
import React from 'react'
import { Card, Checkbox, Text, createUseStyles } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  // Стили аналогичны предыдущему примеру
}))

export const CheckboxCard = () => {
  const [selected, setSelected] = React.useState(['1'])
  const styles = useStyles()

  const onChange = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const cards = [
    {
      title: 'Опция 1',
      id: '1',
      price: '55',
      content: 'Описание первой опции',
    },
    {
      title: 'Опция 2',
      id: '2',
      price: '430',
      content: 'Описание второй опции',
    },
    {
      title: 'Опция 3',
      id: '3',
      price: '950',
      content: 'Описание третьей опции',
    },
  ]

  return (
    <div style={{ width: 600, margin: 'auto' }}>
      {cards.map(({ id, content, title, price }) => (
        <Card
          key={id}
          className={styles.card}
          kind="selectable"
          checked={selected.includes(id)}
          onChange={() => onChange(id)}
        >
          <div className={styles.container}>
            <Checkbox
              inputProps={{ tabIndex: -1 }}
              checked={selected.includes(id)}
              onChange={() => {
                onChange(id)
              }}
            />
            <div className={styles.mainContent}>
              <Text kind="titleLg">{title}</Text>
              <Text kind="body2" className={styles.subtitle}>
                Подзаголовок
              </Text>
              <Text kind="bodyMd" className={styles.content}>
                {content}
              </Text>
            </div>
            <Text kind="titleMd">{price}</Text>
          </div>
        </Card>
      ))}
    </div>
  )
}
```

### Горизонтальная карточка

Пример карточки с горизонтальным расположением контента:

```jsx
import React from 'react'
import { Card, Text, Button } from '@v-uik/base'

export const HorizontalCard = () => {
  return (
    <Card>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <Text kind="titleLg" gutterBottom>
            Заголовок карточки
          </Text>
          <Text kind="body1">
            Содержимое карточки в горизонтальной компоновке. Текст располагается
            слева, а действия или дополнительное содержимое - справа.
          </Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button>Действие</Button>
        </div>
      </div>
    </Card>
  )
}
```

## Доступность

При использовании карточек с возможностью выбора (`kind="selectable"`) или кликабельных карточек (`kind="clickable"`), 
следует обеспечить правильную поддержку доступности:

- Для карточек с выбором используйте `aria-label` или другие ARIA-атрибуты для улучшения доступности
- Убедитесь, что кликабельные карточки имеют соответствующие атрибуты `role` и `aria-*`
- При использовании кастомных элементов управления внутри карточки, убедитесь, что они корректно работают с клавиатурой 