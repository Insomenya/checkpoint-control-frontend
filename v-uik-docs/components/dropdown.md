# Dropdown

Функциональная обертка компонента Popup, предоставляющая дополнительные возможности работы с выпадающими меню.

## Импорт

```jsx
import { Dropdown } from '@v-uik/base'
```

или

```jsx
import { Dropdown } from '@v-uik/dropdown'
```

## API

| Свойство          | Тип                                                                             | По умолчанию | Описание                                            |
| ----------------- | ------------------------------------------------------------------------------- | ------------ | --------------------------------------------------- |
| `action`          | `'hover' \| 'click' \| 'contextMenu' \| Array<'hover' \| 'click' \| 'contextMenu'>` | `'click'`    | Тип события срабатывания триггера                   |
| `content`         | `React.ReactNode`                                                               | -            | Содержимое выпадающего меню                         |
| `mouseEnterDelay` | `number`                                                                        | `100`        | Задержка при открытии по наведению (мс)             |
| `mouseLeaveDelay` | `number`                                                                        | `100`        | Задержка при закрытии по наведению (мс)             |
| `onStateChange`   | `(open: boolean) => void`                                                       | -            | Обработчик изменения состояния открытия/закрытия    |
| `children`        | `React.ReactElement`                                                            | -            | HTML-элемент триггер                                |
| `anchor`          | `HTMLElement \| null`                                                           | -            | Элемент, относительно которого позиционируется меню |

Также включает все свойства компонента Popup (за исключенияем anchor).

## Описание

Компонент `Dropdown` является более функциональной оберткой `Popup`. 
Компонент-потомок `Dropdown` становится триггером и ориентиром отображения `Popup` по действию, переданному в свойство
`action`: hover, click, focus, contextMenu.
Содержимое компонента `Popup` передается в свойство `content`.

## Примеры использования

### Базовый пример

```jsx
import React from 'react'
import { Button, Dropdown } from '@v-uik/base'

export const Basic = () => {
  const anchor = React.useRef(null)

  return (
    <Dropdown
      anchor={anchor.current}
      content={
        <div
          id="dropdown-id"
          style={{ padding: 10, backgroundColor: '#ccc', borderRadius: 4 }}
        >
          Dropdown content
        </div>
      }
    >
      <Button ref={anchor} aria-describedby="dropdown-id">
        Click me
      </Button>
    </Dropdown>
  )
}
```

### Различные типы событий

Dropdown может открываться по разным типам событий с помощью свойства `action`:

```jsx
import React from 'react'
import { Button, Dropdown } from '@v-uik/base'

export const ActionTypes = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* По клику (по умолчанию) */}
      <Dropdown
        content={<div style={{ padding: 10 }}>Открывается по клику</div>}
        action="click"
      >
        <Button>Click</Button>
      </Dropdown>

      {/* По наведению */}
      <Dropdown
        content={<div style={{ padding: 10 }}>Открывается по наведению</div>}
        action="hover"
      >
        <Button>Hover</Button>
      </Dropdown>

      {/* По правому клику */}
      <Dropdown
        content={<div style={{ padding: 10 }}>Открывается по правому клику</div>}
        action="contextMenu"
      >
        <Button>Right Click</Button>
      </Dropdown>
      
      {/* По нескольким событиям */}
      <Dropdown
        content={<div style={{ padding: 10 }}>Открывается по наведению и клику</div>}
        action={['hover', 'click']}
      >
        <Button>Hover и Click</Button>
      </Dropdown>
    </div>
  )
}
```

### Отслеживание состояния открытия

Вы можете отслеживать состояние открытия/закрытия выпадающего меню с помощью обработчика `onStateChange`:

```jsx
import React from 'react'
import { Button, Dropdown, Text } from '@v-uik/base'

export const DropdownState = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  
  return (
    <div>
      <Text>Состояние: {isOpen ? 'Открыто' : 'Закрыто'}</Text>
      <Dropdown
        content={<div style={{ padding: 10 }}>Содержимое дропдауна</div>}
        onStateChange={setIsOpen}
      >
        <Button>Открыть меню</Button>
      </Dropdown>
    </div>
  )
}
```

### Настройка задержки показа/скрытия

Для меню, открывающихся по наведению, можно настроить задержку показа и скрытия:

```jsx
import React from 'react'
import { Button, Dropdown } from '@v-uik/base'

export const DelayExample = () => {
  return (
    <Dropdown
      content={<div style={{ padding: 10 }}>Меню с увеличенной задержкой</div>}
      action="hover"
      mouseEnterDelay={500} // 500ms задержка перед открытием
      mouseLeaveDelay={300} // 300ms задержка перед закрытием
    >
      <Button>Hover с задержкой</Button>
    </Dropdown>
  )
}
```

## Интеграция с DropdownMenu

Компонент `Dropdown` часто используется вместе с `DropdownMenu` для создания полноценных меню:

```jsx
import React from 'react'
import { Button, Dropdown, DropdownMenu, DropdownMenuItem } from '@v-uik/base'

export const MenuExample = () => {
  return (
    <Dropdown
      content={
        <DropdownMenu>
          <DropdownMenuItem>Пункт меню 1</DropdownMenuItem>
          <DropdownMenuItem>Пункт меню 2</DropdownMenuItem>
          <DropdownMenuItem>Пункт меню 3</DropdownMenuItem>
        </DropdownMenu>
      }
    >
      <Button>Открыть меню</Button>
    </Dropdown>
  )
}
```

## Доступность

Компонент обеспечивает базовую доступность, автоматически добавляя ARIA-атрибуты. Его доступность можно настраивать аналогично компонентам Popup и Tooltip через `aria` атрибуты.

Важно учитывать следующее:
- Используйте атрибут `aria-describedby` для связывания триггера и выпадающего меню
- При использовании с клавиатурой, убедитесь, что контент доступен через клавишу Tab
- При необходимости добавьте метки `aria-label` для улучшения доступности 