# Accordion

Компонент аккордеон представляет собой вертикально сложенный список элементов.
Каждый элемент может быть «развёрнут» или «раскрыт», чтобы показать содержимое, связанное с этим элементом.

## Импорт

```tsx
import { Accordion, AccordionItem } from '@v-uik/base'
```

или

```tsx
import { Accordion, AccordionItem } from '@v-uik/accordion'
```

## API

### Accordion API

Accordion представляет собой контейнер для элементов AccordionItem. Доступны все свойства нативного компонента `div`.

### AccordionItem API

| Свойство       | Тип                                                | По умолчанию | Описание                                     |
| -------------- | -------------------------------------------------- | ------------ | -------------------------------------------- |
| `classes`      | `Partial<Classes>`                                 | -            | JSS-классы для стилизации                    |
| `disabled`     | `boolean`                                          | `false`      | Состояние активности элемента                |
| `header`       | `React.ReactNode`                                  | -            | Заголовок аккордеона (обязательное свойство) |
| `expanded`     | `boolean`                                          | `false`      | Состояние элемента "скрыт"/"раскрыт"         |
| `headerProps`  | `HeaderProps`                                      | -            | Набор пользовательских свойств для заголовка элемента |
| `contentProps` | `ContentProps`                                     | -            | Набор пользовательских свойств для контента элемента |
| `onClick`      | `(e: React.MouseEvent<HTMLButtonElement>) => void` | -            | Обработчик события клика по кнопке           |
| `components`   | `AccordionComponentsConfig`                        | -            | Свойство для переопределения элементов AccordionItem |

Также доступны все свойства нативного компонента `div`.

## Примеры использования

### Базовое использование

Пример использования нескольких независимых элементов аккордеона, которые могут быть открыты одновременно.

```tsx
import * as React from 'react'
import { Accordion, AccordionItem } from '@v-uik/base'

const BasicAccordion = () => {
  const [expanded, setExpanded] = React.useState({
    first: false,
    second: false,
    third: false,
  })

  const handleOpen = (field) => () => {
    setExpanded({ ...expanded, [field]: !expanded[field] })
  }

  return (
    <Accordion style={{ maxWidth: 600 }}>
      <AccordionItem
        expanded={expanded.first}
        header="How do you acquire a dog?"
        onClick={handleOpen('first')}
      >
        Three common ways for a prospective owner to acquire a dog is from pet
        shops, private owners, or shelters.
      </AccordionItem>
      <AccordionItem
        disabled
        expanded={expanded.second}
        header="What kinds of dogs are there?"
        onClick={handleOpen('second')}
      >
        There are many breeds of dogs. Each breed varies in size and temperament.
      </AccordionItem>
      <AccordionItem
        expanded={expanded.third}
        header={
          <span>
            What is a <b>dog</b>?
          </span>
        }
        onClick={handleOpen('third')}
      >
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness.
      </AccordionItem>
    </Accordion>
  )
}
```

### Аккордеон с одним открытым элементом

Пример использования аккордеона, где только один элемент может быть открыт в любой момент времени.

```tsx
import * as React from 'react'
import { Accordion, AccordionItem } from '@v-uik/base'

const CollapseAccordion = () => {
  const [expanded, setExpanded] = React.useState(null)

  const handleOpen = (field) => () => {
    setExpanded(field === expanded ? null : field)
  }

  return (
    <Accordion style={{ maxWidth: 600 }}>
      <AccordionItem
        expanded={expanded === 'first'}
        header="How do you acquire a dog?"
        onClick={handleOpen('first')}
      >
        Three common ways for a prospective owner to acquire a dog is from pet
        shops, private owners, or shelters.
      </AccordionItem>
      <AccordionItem
        expanded={expanded === 'second'}
        header="What kinds of dogs are there?"
        onClick={handleOpen('second')}
      >
        There are many breeds of dogs. Each breed varies in size and temperament.
      </AccordionItem>
      <AccordionItem
        expanded={expanded === 'third'}
        header={
          <span>
            What is a <b>dog</b>?
          </span>
        }
        onClick={handleOpen('third')}
      >
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness.
      </AccordionItem>
    </Accordion>
  )
}
```

### Пользовательская иконка

Пример с переопределением стандартной иконки раскрытия.

```tsx
import * as React from 'react'
import { Accordion, AccordionItem, AccordionIconProps } from '@v-uik/base'

const Icon = ({ expanded, classes }: AccordionIconProps) => {
  return (
    <span
      className={classes?.headerIcon}
      style={{
        display: 'inline-flex',
        height: 24,
        width: 24,
        justifyContent: 'center',
        color: expanded ? 'red' : 'black',
        alignItems: 'center',
      }}
    >
      ⇩
    </span>
  )
}

const CustomIconAccordion = () => {
  const [expanded, setExpanded] = React.useState(null)

  const handleOpen = (field) => () => {
    setExpanded(field === expanded ? null : field)
  }

  return (
    <Accordion style={{ maxWidth: 600 }}>
      <AccordionItem
        expanded={expanded === 'first'}
        header="How do you acquire a dog?"
        components={{
          Icon,
        }}
        onClick={handleOpen('first')}
      >
        Three common ways for a prospective owner to acquire a dog is from pet shops, 
        private owners, or shelters.
      </AccordionItem>
    </Accordion>
  )
}
```

## Стилизация

Компонент AccordionItem использует следующие CSS-классы для стилизации:

| Класс       | Описание                                      |
| ----------- | --------------------------------------------- |
| `root`      | Корневой элемент компонента                   |
| `header`    | Заголовок аккордеона                          |
| `headerText`| Текст заголовка                               |
| `headerIcon`| Иконка раскрытия/сворачивания                 |
| `content`   | Содержимое аккордеона                         |
| `expanded`  | Стиль для раскрытого состояния                | 