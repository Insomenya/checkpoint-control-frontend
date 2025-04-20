# Drawer

Раскрываемая боковая панель для отображения дополнительной информации.

## Импорт

```jsx
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '@v-uik/base'
```

или

```jsx
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '@v-uik/drawer'
```

## API

### Drawer API

| Свойство          | Тип                                             | По умолчанию | Описание                                                |
| ----------------- | ----------------------------------------------- | ------------ | ------------------------------------------------------- |
| `open`            | `boolean`                                       | `false`      | Состояние открытия/закрытия панели                      |
| `placement`       | `'left' \| 'right' \| 'top' \| 'bottom'`        | `'right'`    | Расположение панели относительно экрана                 |
| `width`           | `string \| number`                              | -            | Ширина панели                                          |
| `height`          | `string \| number`                              | -            | Высота панели                                          |
| `backdrop`        | `boolean`                                       | `true`       | Показывать затемнение фона                              |
| `bodyScrollLock`  | `boolean`                                       | `true`       | Блокировать прокрутку основного содержимого             |
| `onClose`         | `() => void`                                    | -            | Функция обратного вызова при закрытии панели            |
| `container`       | `HTMLElement`                                   | -            | Контейнер для рендеринга панели                         |
| `keepMounted`     | `boolean`                                       | `false`      | Сохранять компонент в DOM после закрытия                |
| `contentProps`    | `React.HTMLAttributes<HTMLDivElement>`          | -            | Свойства контейнера содержимого                         |
| `backdropProps`   | `React.HTMLAttributes<HTMLDivElement>`          | -            | Свойства затемняющего фона                              |
| `classes`         | `DrawerClasses`                                 | -            | CSS классы для стилизации                               |

Также доступны свойства нативного компонента `div`.

### DrawerHeader API

| Свойство           | Тип                   | По умолчанию | Описание                                         |
| ------------------ | --------------------- | ------------ | ------------------------------------------------ |
| `subtitle`         | `React.ReactNode`     | -            | Подзаголовок панели                              |
| `showCloseButton`  | `boolean`             | `true`       | Показывать кнопку закрытия                       |
| `onClose`          | `() => void`          | -            | Функция обратного вызова при нажатии на кнопку   |
| `closeButtonProps` | `CloseButtonProps`    | -            | Свойства для кнопки закрытия                     |
| `classes`          | `DrawerHeaderClasses` | -            | CSS классы для стилизации                        |

Также доступны свойства нативного компонента `div`.

### DrawerFooter API

| Свойство  | Тип                   | По умолчанию | Описание                          |
| --------- | --------------------- | ------------ | --------------------------------- |
| `classes` | `DrawerFooterClasses` | -            | CSS классы для стилизации         |

Также доступны свойства нативного компонента `div`.

## Примеры использования

### Базовая функциональность

Drawer — это боковая панель для предоставления какой-либо информации, не требующей постоянного отображения на странице.

```jsx
import React from 'react'
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
} from '@v-uik/base'

export const BasicDrawer = () => {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(!open)}>show drawer</Button>
      <Drawer open={open} onClose={handleClose}>
        <DrawerHeader
          subtitle="Подзаголовок"
          closeButtonProps={{
            'aria-label': 'Close drawer',
          }}
          onClose={handleClose}
        >
          Заголовок
        </DrawerHeader>
        <DrawerBody>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi
            beatae consectetur dolore doloremque doloribus earum enim, ex
            exercitationem facere natus nisi nostrum repellat repudiandae rerum,
            sit tenetur velit voluptate.
          </Text>
        </DrawerBody>
        <DrawerFooter>
          <Button kind="outlined" onClick={handleClose}>
            Close
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
```

### Варианты расположения на странице

С помощью свойства `placement` можно выбрать, с какой стороны экрана будет появляться боковая панель: сверху, снизу, справа или слева.

```jsx
import React from 'react'
import {
  Drawer,
  DrawerPlacementType,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
} from '@v-uik/base'

export const PositionsExample = () => {
  const [opened, setOpened] = React.useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  })

  return (
    <>
      {(['left', 'right', 'top', 'bottom']).map((placement) => {
        const toggle = (val) =>
          setOpened({
            ...opened,
            [placement]: val,
          })

        const handleClose = () => toggle(false)

        return (
          <React.Fragment key={placement}>
            <Button style={{ marginRight: 16 }} onClick={() => toggle(true)}>
              {placement}
            </Button>
            <Drawer
              open={opened[placement]}
              placement={placement}
              onClose={handleClose}
            >
              <DrawerHeader showCloseButton={false}>{placement}</DrawerHeader>
              <DrawerBody>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Text>
              </DrawerBody>
              <DrawerFooter>
                <Button kind="outlined" onClick={handleClose}>
                  Закрыть
                </Button>
                <Button onClick={handleClose}>Подтвердить</Button>
              </DrawerFooter>
            </Drawer>
          </React.Fragment>
        )
      })}
    </>
  )
}
```

### Без блокировки страницы

Для отключения затемнения фона установите свойство `backdrop` в значение `false`.
Для деактивации блокировки прокрутки страницы задайте свойству `bodyScrollLock` значение `false`.

```jsx
import React from 'react'
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
} from '@v-uik/base'

export const NonModalExample = () => {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Показать без блокировки</Button>
      <Drawer 
        open={open} 
        onClose={handleClose}
        backdrop={false}
        bodyScrollLock={false}
      >
        <DrawerHeader onClose={handleClose}>
          Без блокировки страницы
        </DrawerHeader>
        <DrawerBody>
          <Text>
            Эта панель не блокирует прокрутку страницы и не имеет затемнения.
          </Text>
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={handleClose}>Закрыть</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
```

### Сохранение Drawer в DOM

Чтобы оставить компонент Drawer в DOM-дереве после скрытия, установите свойство `keepMounted` в значение `true`.

```jsx
import React from 'react'
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
} from '@v-uik/base'

export const KeepMountedExample = () => {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Показать Drawer</Button>
      <Drawer keepMounted open={open} onClose={handleClose}>
        <DrawerHeader subtitle="Подзаголовок" onClose={handleClose}>
          Заголовок
        </DrawerHeader>
        <DrawerBody>
          <Text>
            Этот Drawer остается в DOM даже после закрытия.
          </Text>
        </DrawerBody>
        <DrawerFooter>
          <Button kind="outlined" onClick={handleClose}>
            Закрыть
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}
```

## Доступность

Компонент автоматически задает необходимые ARIA-атрибуты (`role`, `aria-modal`) по умолчанию для варианта с затемнением фона. Настройка этих атрибутов возможна через свойство `contentProps`.
При открытии меню фокус устанавливается на скрытый статический элемент, от которого можно перейти к следующим фокусируемым элементам. 