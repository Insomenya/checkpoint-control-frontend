# Notification

Компонент NotificationContainer используется для отображения системных нотификаций (сообщений, предупреждений, ошибок и т.п.).

## Импорт

```jsx
import { NotificationContainer, notification } from '@v-uik/base'
```

или

```jsx
import { NotificationContainer, notification } from '@v-uik/notification'
```

## API

### NotificationContainer API

| Свойство               | Тип                       | По умолчанию   | Описание                                         |
| ---------------------- | ------------------------- | -------------- | ------------------------------------------------ |
| `position`             | `TNotificationPosition`   | `'topRight'`   | Позиция расположения уведомлений                 |
| `status`               | `TNotificationStatus`     | `'default'`    | Статус уведомлений по умолчанию                  |
| `autoClose`            | `number \| false`         | `4000`         | Время автоматического закрытия (мс) или false    |
| `limit`                | `number`                  | `5`            | Максимальное количество уведомлений              |
| `closeOnClick`         | `boolean`                 | `true`         | Закрывать при клике на уведомление               |
| `closeOnEscapeKeyDown` | `boolean`                 | `true`         | Закрывать при нажатии клавиши Escape             |
| `pauseOnHover`         | `boolean`                 | `true`         | Приостанавливать автозакрытие при наведении      |
| `pauseOnWindowBlur`    | `boolean`                 | `true`         | Приостанавливать автозакрытие при потере фокуса  |
| `showCloseButton`      | `boolean`                 | `true`         | Показывать кнопку закрытия уведомления           |
| `showIndicator`        | `boolean`                 | `true`         | Показывать цветовой индикатор слева              |
| `classes`              | `NotificationContainerClasses` | -          | CSS классы для стилизации                        |

Также доступны свойства нативного компонента `div`.

### NotificationOptions API

| Свойство             | Тип                     | По умолчанию | Описание                                           |
| -------------------- | ----------------------- | ------------ | -------------------------------------------------- |
| `id`                 | `string`                | -            | Уникальный идентификатор уведомления               |
| `position`           | `TNotificationPosition` | -            | Переопределение позиции для уведомления            |
| `status`             | `TNotificationStatus`   | -            | Статус уведомления (info, success, warning, error) |
| `title`              | `React.ReactNode`       | -            | Заголовок уведомления                              |
| `icon`               | `React.ReactNode`       | -            | Иконка уведомления                                 |
| `direction`          | `'vertical' \| 'horizontal'` | -       | Направление отображения содержимого                |
| `actions`            | `React.ReactNode`       | -            | Дополнительные действия для уведомления            |
| `autoClose`          | `number \| false`       | -            | Переопределение времени автозакрытия               |
| `closeOnClick`       | `boolean`               | -            | Переопределение закрытия по клику                  |
| `showCloseButton`    | `boolean`               | -            | Переопределение отображения кнопки закрытия        |
| `showIndicator`      | `boolean`               | -            | Переопределение отображения индикатора             |
| `closeButtonAriaLabel` | `string`              | -            | ARIA-метка для кнопки закрытия                     |
| `closeButtonProps`   | `object`                | -            | Дополнительные свойства для кнопки закрытия        |

## Использование

Для корректной работы необходимо добавить `NotificationContainer` в приложение **в одном экземпляре** (например, в корень React-дерева), и затем использовать объект `notification` для отправки сообщений.

### Базовое использование

```jsx
import * as React from 'react'
import {
  NotificationContainer,
  notification as coreNotification,
  Button,
} from '@v-uik/base'

export default () => {
  return (
    <>
      <NotificationContainer />
      <Button onClick={() => coreNotification('notification content')}>
        показать уведомление
      </Button>
    </>
  )
}
```

### Встроенные типы уведомлений

Функция notification имеет встроенные методы для более удобного вызова различных типов сообщений:

```jsx
import { notification } from '@v-uik/base'

// Успешное сообщение (зелёное)
notification.success('Операция успешно выполнена')

// Информационное сообщение (синее)
notification.info('Важная информация')

// Предупреждение (жёлтое)
notification.warning('Внимание! Это предупреждение')

// Ошибка (красное)
notification.error('Произошла ошибка')
```

### Программное закрытие уведомления

Функция notification возвращает идентификатор сообщения, который затем может использоваться для его закрытия программно с помощью метода `notification.close()`:

```jsx
import { notification, Button } from '@v-uik/base'

const MyComponent = () => {
  const showNotification = () => {
    const id = notification('Уведомление с кнопкой закрытия', {
      autoClose: false,
    })
    
    setTimeout(() => {
      notification.close(id)
    }, 3000)
  }
  
  return <Button onClick={showNotification}>Показать уведомление</Button>
}
```

### Расширенное использование

Пример уведомления с заголовком, пользовательскими действиями и специальными настройками:

```jsx
import * as React from 'react'
import { Button, Link, notification } from '@v-uik/base'

export const CustomNotification = () => {
  const showCustomNotification = () => {
    notification('Подробное описание уведомления', {
      direction: 'vertical',
      title: 'Важное уведомление',
      status: 'info',
      actions: (
        <div style={{ display: 'flex' }}>
          <Link href="">Подробнее</Link>
          <Button 
            style={{ marginLeft: 'auto' }}
            kind="outlined"
            size="sm"
            color="secondary"
          >
            Действие
          </Button>
        </div>
      ),
    })
  }
  
  return (
    <Button onClick={showCustomNotification}>
      Показать расширенное уведомление
    </Button>
  )
}
```

### Настройка направления содержимого

С помощью свойства `direction` можно настроить вертикальное или горизонтальное отображение содержимого:

```jsx
// Горизонтальное расположение (по умолчанию)
notification('Краткое уведомление', {
  direction: 'horizontal'
})

// Вертикальное расположение (для длинных текстов)
notification('Подробное описание уведомления с множеством деталей', {
  direction: 'vertical',
  title: 'Заголовок уведомления'
})
```

### Настройка иконок

```jsx
import { notification } from '@v-uik/base'
import { CustomIcon } from './components/icons'

// С пользовательской иконкой
notification('Сообщение с пользовательской иконкой', {
  icon: <CustomIcon />
})

// Без иконки
notification('Сообщение без иконки', {
  icon: null
})
```

## Доступность

Для улучшения доступности в кнопке закрытия можно использовать ARIA-метку:

```jsx
notification('Сообщение', {
  closeButtonAriaLabel: 'Закрыть уведомление'
})
``` 