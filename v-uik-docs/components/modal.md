# Modal

Компонент Modal представляет собой модальное окно для отображения важного контента, требующего внимания пользователя.

## Импорт

```jsx
import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, 
  ModalProvider, 
  ModalContainer, 
  modal 
} from '@v-uik/modal'
```

или

```jsx
import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, 
  ModalProvider, 
  ModalContainer, 
  modal 
} from '@v-uik/base'
```

## API

### Свойства компонента Modal

| Свойство                     | Тип                  | По умолчанию | Описание                                       |
| ---------------------------- | -------------------- | ------------ | ---------------------------------------------- |
| `open`                       | `boolean`            | `false`      | Флаг открытия модального окна                  |
| `width`                      | `number`             | `432`        | Ширина модального окна                         |
| `onClose`                    | `(event) => void`    | -            | Обработчик закрытия окна                       |
| `keepMounted`                | `boolean`            | `false`      | Сохранить компонент в DOM после скрытия        |
| `disableEscapePressHandler`  | `boolean`            | `false`      | Отключить закрытие по клавише Esc              |
| `disableBackdropClickHandler`| `boolean`            | `false`      | Отключить закрытие при клике вне модального окна |
| `disableBackdrop`            | `boolean`            | `false`      | Отключить подложку (фон) модального окна      |
| `zIndex`                     | `number`             | -            | Определение положения модального окна по оси z |
| `backdropProps`              | `React.HTMLAttributes<HTMLDivElement>` | -    | Атрибуты элемента фона окна  |
| `contentProps`               | `React.HTMLAttributes<HTMLDivElement>` | -    | Атрибуты элемента модального окна |
| `container`                  | `HTMLElement \| (() => HTMLElement)` | -    | HTML-элемент для рендеринга модального окна |
| `classes`                    | `Partial<Classes>`   | -            | CSS классы для стилизации                      |

Также доступны все атрибуты нативного элемента `div`.

### Компоненты для структуры модального окна

Для создания модального окна используются следующие компоненты:

- **ModalHeader** - заголовок модального окна
- **ModalBody** - тело модального окна
- **ModalFooter** - футер модального окна

## Примеры использования

### Базовое использование

```jsx
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button 
} from '@v-uik/modal'
import { useState } from 'react'

export const BasicModal = () => {
  const [open, setOpen] = useState(false)

  const showModal = () => setOpen(true)
  const hideModal = () => setOpen(false)

  return (
    <>
      <Button onClick={showModal}>Открыть модальное окно</Button>
      <Modal open={open} onClose={hideModal}>
        <ModalHeader subtitle="Дополнительный подзаголовок">
          Заголовок модального окна
        </ModalHeader>
        <ModalBody>
          <p>
            Содержимое модального окна. Здесь можно разместить любой контент,
            включая формы, текст, изображения и другие компоненты.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button kind="outlined" onClick={hideModal}>
            Отмена
          </Button>
          <Button onClick={hideModal}>Подтвердить</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
```

### Настройка ширины модального окна

```jsx
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button 
} from '@v-uik/modal'
import { useState } from 'react'

export const CustomWidthModal = () => {
  const [open, setOpen] = useState(false)

  const showModal = () => setOpen(true)
  const hideModal = () => setOpen(false)

  return (
    <>
      <Button onClick={showModal}>Открыть широкое модальное окно</Button>
      <Modal width={600} open={open} onClose={hideModal}>
        <ModalHeader>Широкое модальное окно</ModalHeader>
        <ModalBody>
          <p>
            Это модальное окно имеет ширину 600 пикселей вместо стандартных 432.
            Вы можете настраивать ширину модального окна в зависимости от контента.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button kind="outlined" onClick={hideModal}>
            Закрыть
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
```

### Сохранение состояния модального окна

Компонент поддерживает сохранение в DOM после закрытия с помощью свойства `keepMounted`:

```jsx
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button 
} from '@v-uik/modal'
import { useState } from 'react'

export const KeepMountedModal = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Открыть модальное окно с сохранением состояния
      </Button>
      <Modal keepMounted open={open} onClose={() => setOpen(false)}>
        <ModalHeader>Сохранение состояния</ModalHeader>
        <ModalBody>
          <p>Введите текст, затем закройте и снова откройте модальное окно:</p>
          <input 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
```

### Отключение стандартных обработчиков закрытия

```jsx
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button 
} from '@v-uik/modal'
import { useState } from 'react'

export const DisabledHandlersModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Открыть модальное окно без стандартных способов закрытия
      </Button>
      <Modal 
        open={open} 
        onClose={() => setOpen(false)}
        disableEscapePressHandler
        disableBackdropClickHandler
      >
        <ModalHeader closeButtonProps={{ style: { display: 'none' } }}>
          Важное модальное окно
        </ModalHeader>
        <ModalBody>
          <p>
            Это модальное окно нельзя закрыть нажатием клавиши Esc или
            кликом вне модального окна. Пользователь должен явно нажать
            на кнопку закрытия.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
```

### Использование методов через API

V-UIK предоставляет императивный API для работы с модальными окнами через объект `modal`:

```jsx
import { 
  modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  ModalContainer, 
  Button,
  generateId 
} from '@v-uik/modal'

// Компонент должен содержать ModalContainer
export const MethodsModal = () => {
  const showModal = () => {
    const id = generateId()
    
    const closeModal = () => modal.close(id)
    
    modal.show(id, {
      content: (
        <>
          <ModalHeader>Программное управление модальным окном</ModalHeader>
          <ModalBody>
            <p>
              Это модальное окно открыто с помощью метода modal.show().
              Его можно закрыть программно с помощью modal.close().
            </p>
          </ModalBody>
          <ModalFooter>
            <Button kind="outlined" onClick={closeModal}>
              Отмена
            </Button>
            <Button onClick={closeModal}>Подтвердить</Button>
          </ModalFooter>
        </>
      ),
    })
  }

  return (
    <>
      <ModalContainer />
      <Button onClick={showModal}>Открыть модальное окно</Button>
    </>
  )
}
```

Для работы с императивным API необходимо:

1. Обернуть приложение в `ModalProvider` в корневом компоненте
2. Добавить `ModalContainer` в компонент, где будут использоваться модальные окна
3. Использовать методы `modal.show()` и `modal.close()` для управления модальными окнами 