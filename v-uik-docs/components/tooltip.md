# Tooltip

Tooltip — всплывающие подсказки, появляющиеся когда пользователь наводит курсор на элемент, фокусируется на нем или нажимает на него.

## Импорт

```javascript
import { Tooltip } from '@v-uik/tooltip';
```

или

```javascript
import { Tooltip } from '@v-uik/base';
```

## API

### Свойства компонента Tooltip

| Свойство | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `classes` | `Partial<Classes>` | `undefined` | JSS-классы для стилизации |
| `single` | `boolean` | `false` | Компактное отображение содержимого в одну строку |
| `indicator` | `boolean` | `false` | Добавить иконку-индикатор в `Tooltip` |
| `dropdownProps` | `DropdownProps` | `undefined` | Свойства компонента `Dropdown` (placement, content и т.д.) |
| `children` | `React.ReactElement` | — | HTML-элемент, который будет триггером |
| `showOnChildFocus` | `boolean` | `false` | Показывать `Tooltip`, когда триггер получает фокус |
| `interactive` | `boolean` | `false` | Должен быть true, если в `Tooltip` есть интерактивные элементы |
| `pointAtCenter` | `boolean` | `false` | Флаг указания стрелки `Tooltip` на центр элемента |
| `zIndex` | `number` | `undefined` | Порядок наложения компонента `Tooltip` на контент |

Также доступны свойства нативного компонента `div`.

> **Примечание**: `Tooltip` использует компонент `Dropdown`. Для его более детальной конфигурации используйте свойство `dropdownProps`.

## Примеры использования

### Базовое использование

```jsx
import { Tooltip } from '@v-uik/tooltip';

// Простая подсказка
<Tooltip
  dropdownProps={{
    placement: 'right',
    content: 'Это подсказка',
  }}
>
  <span>Наведите на меня</span>
</Tooltip>
```

### Компактный режим (single)

```jsx
import { Tooltip } from '@v-uik/tooltip';

// Компактная подсказка в одну строку
<Tooltip
  single
  dropdownProps={{
    placement: 'right',
    content: 'Компактная подсказка в одну строку',
  }}
>
  <span>Наведите на меня</span>
</Tooltip>
```

### С индикатором

```jsx
import { Tooltip } from '@v-uik/tooltip';

// Подсказка с индикатором
<Tooltip
  indicator
  dropdownProps={{
    placement: 'right',
    content: 'Подсказка с иконкой-индикатором',
  }}
>
  <span>Наведите на меня</span>
</Tooltip>
```

### Интерактивные элементы внутри подсказки

```jsx
import { Tooltip, TooltipContext, Button } from '@v-uik/base';

const InteractiveTooltipContent = () => {
  const tooltipContext = React.useContext(TooltipContext);
  
  return (
    <div>
      <p>Интерактивная подсказка с кнопками</p>
      <div>
        <Button onClick={tooltipContext.close}>Да</Button>
        <Button onClick={tooltipContext.close}>Нет</Button>
      </div>
    </div>
  );
};

// Подсказка с интерактивными элементами
<Tooltip
  interactive
  dropdownProps={{
    placement: 'bottom',
    content: <InteractiveTooltipContent />,
  }}
>
  <Button>Нажмите на меня</Button>
</Tooltip>
```

### Указание стрелки на центр элемента

```jsx
import { Tooltip, Button } from '@v-uik/base';

// Подсказка со стрелкой, указывающей на центр элемента
<Tooltip
  pointAtCenter
  dropdownProps={{
    placement: 'bottom-start',
    content: 'Подсказка для кнопки',
  }}
>
  <Button>Кнопка с подсказкой</Button>
</Tooltip>
```

### Задержка открытия/закрытия

```jsx
import { Tooltip, Button } from '@v-uik/base';

// Подсказка с задержкой открытия и закрытия
<Tooltip
  showOnChildFocus
  single
  dropdownProps={{
    placement: 'bottom',
    content: 'Подсказка с задержкой',
    mouseEnterDelay: 500, // задержка открытия 500мс
    mouseLeaveDelay: 500, // задержка закрытия 500мс
  }}
>
  <Button>Задержка при наведении</Button>
</Tooltip>
```

### Обеспечение доступности

```jsx
import { Tooltip, Button } from '@v-uik/base';

// Доступная подсказка для пользователей клавиатуры
<Tooltip
  showOnChildFocus
  single
  dropdownProps={{
    id: 'tooltip-1',
    placement: 'bottom',
    content: 'Подсказка для кнопки',
  }}
>
  <Button aria-describedby="tooltip-1">
    Кнопка с подсказкой
  </Button>
</Tooltip>
```

## Указание позиции подсказки

Используйте свойство `placement` в `dropdownProps` для указания позиции подсказки относительно триггера:

- `top`, `top-start`, `top-end`
- `right`, `right-start`, `right-end`
- `bottom`, `bottom-start`, `bottom-end`
- `left`, `left-start`, `left-end`

```jsx
import { Tooltip } from '@v-uik/tooltip';

<Tooltip
  dropdownProps={{
    placement: 'bottom-start',
    content: 'Подсказка внизу слева',
  }}
>
  <span>Наведите на меня</span>
</Tooltip>
``` 