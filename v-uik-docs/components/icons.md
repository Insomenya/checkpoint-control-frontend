# Icons

Компонент Icon и коллекция готовых иконок для использования в приложении.

## Импорт

```jsx
// Импорт базового компонента Icon
import { Icon } from '@v-uik/icons'

// Импорт конкретных иконок
import { Search, User, Settings } from '@v-uik/icons'
```

## API

### Icon API

| Свойство     | Тип                 | По умолчанию      | Описание                                    |
| ------------ | ------------------- | ----------------- | ------------------------------------------- |
| `children`   | `React.ReactNode`   | -                 | Нода, передающаяся внутри SVG элемента     |
| `color`      | `string`            | `'currentColor'`  | Цвет иконки                                |
| `width`      | `string \| number`  | `24`              | Ширина иконки                              |
| `height`     | `string \| number`  | `24`              | Высота иконки                              |
| `titleAccess`| `string`            | -                 | Удобочитаемый заголовок для элемента       |
| `viewBox`    | `string`            | `'0 0 24 24'`     | Переопределение координат внутри SVG       |

Также доступны все атрибуты нативного элемента `svg`.

## Примеры использования

### Базовое использование

```jsx
import React from 'react'
import { Search, User, Settings } from '@v-uik/icons'

export const Basic = () => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Search />
      <User />
      <Settings />
    </div>
  )
}
```

### Настройка цвета иконки

```jsx
import React from 'react'
import { Search } from '@v-uik/icons'

export const ColoredIcons = () => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Search color="red" />
      <Search color="blue" />
      <Search color="#00FF00" />
      <Search style={{ color: 'purple' }} />
    </div>
  )
}
```

### Настройка размера иконки

```jsx
import React from 'react'
import { User } from '@v-uik/icons'

export const SizedIcons = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <User width={16} height={16} />
      <User width={24} height={24} />
      <User width={32} height={32} />
      <User width={48} height={48} />
    </div>
  )
}
```

### Доступность иконок

Для улучшения доступности используйте свойство `titleAccess`:

```jsx
import React from 'react'
import { Settings } from '@v-uik/icons'

export const AccessibleIcon = () => {
  return (
    <Settings titleAccess="Настройки приложения" />
  )
}
```

### Создание собственной иконки

Компонент `Icon` можно использовать для создания собственных иконок:

```jsx
import React from 'react'
import { Icon } from '@v-uik/icons'

export const UserIcon = () => {
  return (
    <Icon color="blue" titleAccess="Пользовательская иконка">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 1.5C2.84315 1.5 1.5 2.84315 1.5 4.5V10.5H3V4.5C3 3.67157 3.67157 3 4.5 3H10.5V1.5H4.5ZM3 13.5H1.5V19.5C1.5 21.1569 2.84315 22.5 4.5 22.5H10.5V21H4.5C3.67157 21 3 20.3284 3 19.5V13.5ZM19.5 22.5H13.5V21H19.5C20.3284 21 21 20.3284 21 19.5V13.5H22.5V19.5C22.5 21.1569 21.1569 22.5 19.5 22.5ZM22.5 10.5V4.5C22.5 2.84315 21.1569 1.5 19.5 1.5H13.5V3H19.5C20.3284 3 21 3.67157 21 4.5V10.5H22.5Z"
        fill="currentColor"
      />
    </Icon>
  )
}
```

## Использование иконок с другими компонентами

### С кнопками

```jsx
import React from 'react'
import { Button } from '@v-uik/base'
import { Square, Search } from '@v-uik/icons'

export const ButtonWithIcons = () => {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button prefixIcon={<Square />}>Button</Button>
      <Button prefixIcon={<Search />} suffixIcon={<Square />}>
        Button
      </Button>
      <Button suffixIcon={<Search />}>Button</Button>
    </div>
  )
}
```

### Как интерактивный элемент

```jsx
import React from 'react'
import { Search } from '@v-uik/icons'

export const InteractiveIcon = () => {
  return (
    <Search 
      style={{ cursor: 'pointer' }}
      onClick={() => alert('Icon clicked!')}
      titleAccess="Нажмите для поиска"
    />
  )
}
```

## Категории иконок

В библиотеке представлено множество иконок, сгруппированных по категориям:

### Навигация

- `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` - стрелки
- `ChevronUp`, `ChevronDown`, `ChevronLeft`, `ChevronRight` - шевроны
- `Menu`, `More`, `MoreVertical` - меню
- `Home`, `Search` - навигация по приложению

### Действия

- `Plus`, `Minus`, `Cross`, `Check` - базовые действия
- `Edit`, `Delete`, `Save`, `Download`, `Upload` - файловые операции
- `Refresh`, `Undo`, `Redo` - обновление и изменение

### Уведомления

- `Info`, `Warning`, `Error`, `Success` - статусы
- `Bell`, `Mail`, `Message` - нотификации

### Интерфейс

- `Folder`, `File`, `Document` - файлы и документы
- `Calendar`, `Clock`, `Timer` - время
- `User`, `Users`, `Person` - пользователи
- `Settings`, `Filter`, `Sort` - настройки

### Бизнес и финансы

- `Money`, `CreditCard`, `Wallet` - финансы
- `Chart`, `Graph`, `PieChart` - аналитика
- `Package`, `Truck`, `Cart` - электронная коммерция 

## Полный список доступных категорий иконок в V-UIK

В дизайн-системе V-UIK физически доступны следующие категории иконок:

### Основные иконки (Essential)

1. **Arrows** - стрелки и индикаторы направления
   - `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`
   - `ArrowUpRight`, `ArrowUpLeft`, `ArrowDownRight`, `ArrowDownLeft`
   - `CircleArrowUp`, `CircleArrowDown`, `CircleArrowLeft`, `CircleArrowRight`
   - `Refresh`, `Rotate`, `RotateClockwise`, `Repeat`

2. **Shevrons** - шевроны для навигации и аккордеонов
   - `ChevronUp`, `ChevronDown`, `ChevronLeft`, `ChevronRight`
   - `ChevronsUp`, `ChevronsDown`, `ChevronsLeft`, `ChevronsRight`
   - `CaretUpFilled`, `CaretDownFilled`, `CaretLeftFilled`, `CaretRightFilled` 

3. **User** - иконки пользователей и аутентификации
   - `User`, `Users`, `UsersGroup`
   - `UserCircle`, `UserPlus`, `UserMinus`, `UserCheck`, `UserX`, `UserEdit`
   - `Login`, `Logout`

4. **Statuses** - индикаторы статусов
   - `AlertCircle`, `AlertCircleFilled`, `AlertTriangle`, `AlertTriangleFilled`
   - `InfoCircle`, `InfoCircleFilled`, `HelpCircle`, `HelpCircleFilled`
   - `CircleCheck`, `CircleCheckFilled`, `Activity`

5. **Commerce** - коммерция и финансы
   - `CurrencyDollar`, `CurrencyEuro`, `CurrencyPound`, `CurrencyYen`
   - `ShoppingCart`, `ShoppingBag`
   - `TrendingUp`, `TrendingDown`, `Target`
   - `ChartLine`, `ChartBar`, `ChartPie`, `ChartArea`, `ChartDonut`

6. **File & Storage** - файлы и хранение данных
   - `File`, `Folder`, `FolderOpen`, `FolderPlus`, `FolderMinus`
   - `FileText`, `FilePlus`, `FileMinus`
   - `FileTypeDoc`, `FileTypePdf`, `FileTypeCsv`, `FileTypeZip`, `FileTypeHtml`
   - `Archive`, `Database`, `Server`, `Disc`

7. **Editor** - редактирование текста
   - `Bold`, `Italic`, `Underline`
   - `AlignLeft`, `AlignRight`, `AlignCenter`, `AlignJustified`
   - `List`, `Code`, `Terminal`
   - `Scissors`, `Paperclip`, `Clipboard`

8. **Management** - управление и настройки
   - `Settings`, `Filter`, `Search`
   - `Check`, `X`, `Checks`
   - `Eye`, `EyeOff`, `Lock`, `LockOpen`
   - `Pin`, `PinnedFilled`, `Edit`, `EditCircle`
   - `Trash`, `TrashX`, `Copy`, `Send`

9. **Date & Time** - дата и время
   - `Calendar`, `Clock`, `Timer`, `Alarm`

10. **Device & Multimedia** - устройства и мультимедиа
    - `Camera`, `Microphone`, `Speaker`, `Headphones`
    - `Smartphone`, `Tablet`, `Laptop`, `Desktop`
    - `Bluetooth`, `Wifi`, `Battery`

11. **Math** - математические символы
    - `Plus`, `Minus`, `Divide`, `Multiply`
    - `Percentage`, `Equal`, `Infinity`

12. **Shapes** - геометрические формы
    - `Square`, `Circle`, `Triangle`, `Hexagon`
    - `Heart`, `Star`, `Diamond`

13. **Weather & Nature** - погода и природа
    - `Sun`, `Moon`, `Cloud`, `Rain`, `Snow`
    - `Wind`, `Temperature`, `Umbrella`

14. **Layout & Display** - разметка и отображение
    - `Grid`, `Columns`, `Rows`
    - `Maximize`, `Minimize`, `FullScreen`

15. **Internet & Sites** - интернет и сайты
    - `Globe`, `Link`, `ExternalLink`
    - `Share`, `Download`, `Upload`
    - `Mail`, `MessageCircle`, `Chat`

16. **Media Content** - медиаконтент
    - `Play`, `Pause`, `Stop`, `Rewind`
    - `Volume`, `VolumeOff`, `VideoCamera`
    - `Image`, `Music`, `Video`

17. **Mobile** - мобильные интерфейсы
    - `Smartphone`, `Tablet`
    - `QrCode`, `Barcode`
    - `Fingerprint`, `FaceId`

18. **Loading & Uploading** - загрузка
    - `Loader`, `LoaderQuarter`
    - `Download`, `Upload`
    - `Cloud`, `CloudUpload`, `CloudDownload`

### Дополнительные иконки (Supplementary)

V-UIK также включает обширную коллекцию дополнительных иконок, которые охватывают:

1. **Расширенные финансы** - криптовалюты, графики и аналитика
2. **Социальные сети** - логотипы популярных платформ
3. **Транспорт** - автомобили, самолеты, поезда
4. **Еда и напитки** - продукты, рестораны, кухня
5. **Здоровье и фитнес** - медицина, спорт, активности
6. **Путешествия** - отели, достопримечательности, карты
7. **Развлечения** - игры, хобби, отдых
8. **Специальные символы** - зодиак, математические символы

## Пример использования нескольких иконок из разных категорий

```jsx
import React from 'react'
import { 
  // Навигация
  ArrowLeft, ChevronDown,
  // Управление
  Settings, Filter, Search,
  // Уведомления
  AlertCircle, InfoCircle,
  // Файлы
  Folder, File, FileTypePdf,
  // Пользователи
  User, Users,
  // Коммерция
  ShoppingCart, CurrencyDollar
} from '@v-uik/icons'

export const IconCollection = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 16 }}>
      {/* Навигация */}
      <ArrowLeft title="Назад" />
      <ChevronDown title="Развернуть" />
      
      {/* Управление */}
      <Settings title="Настройки" />
      <Filter title="Фильтр" />
      <Search title="Поиск" />
      
      {/* Уведомления */}
      <AlertCircle color="red" title="Ошибка" />
      <InfoCircle color="blue" title="Информация" />
      
      {/* Файлы */}
      <Folder title="Папка" />
      <File title="Файл" />
      <FileTypePdf title="PDF документ" />
      
      {/* Пользователи */}
      <User title="Пользователь" />
      <Users title="Пользователи" />
      
      {/* Коммерция */}
      <ShoppingCart title="Корзина" />
      <CurrencyDollar title="Цена" />
    </div>
  )
}
```

## Примечание

Для оптимизации размера сборки рекомендуется импортировать только те иконки, которые действительно используются в приложении, а не весь пакет целиком. Это позволит значительно уменьшить размер итогового бандла. 