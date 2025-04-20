# Table

Компонент таблиц для отображения табличных данных.

## Импорт

```tsx
import { Table } from '@v-uik/base'
```

или

```tsx
import { Table } from '@v-uik/table'
```

## API

### Основные свойства

| Свойство       | Тип                                                 | По умолчанию | Описание                                                                                      |
| -------------- | --------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------- |
| `classes`      | `Classes`                                           | -            | JSS-классы для стилизации                                                                     |
| `dataSource`   | `RecordDataSource<DataSource>[]`                    | `[]`         | Массив данных, который будет использоваться для отрисовки таблицы                            |
| `columns`      | `ColumnProps<DataSource>[]`                         | -            | Описывает структуру столбца таблицы — заголовок, ключи, события                               |
| `tableLayout`  | `'auto'` \| `'fixed'`                               | `'auto'`     | Устанавливает алгоритм, используемый для размещения ячеек. В случае фиксированных колонок всегда будет 'fixed' |
| `width`        | `number` \| `string`                                | `'auto'`     | Ширина таблицы                                                                                |
| `height`       | `number` \| `string`                                | `'auto'`     | Высота таблицы                                                                                |
| `setRowProps`  | `(params: { row: DataSource, rowIndex: number }) => RowProps` | - | Устанавливает свойства для строки таблицы                                                     |
| `size`         | `'sm'` \| `'md'` \| `'lg'`                          | `'md'`       | Определяет размер таблицы                                                                     |
| `onChange`     | `(params: TableEventType<DataSource>) => void`      | -            | Используется как шина событий для изменения отображения состояния таблицы                     |
| `emptyData`    | `React.ReactNode`                                   | -            | Превью, которое отображается когда данных нет                                                 |
| `hoverable`    | `boolean`                                           | `false`      | Свойство включения hover-эффекта для строк                                                    |
| `bordered`     | `'none'` \| `'cells'` \| `'rows'`                   | `'rows'`     | Добавление границ ячейкам                                                                     |
| `stripe`       | `boolean`                                           | `false`      | Полосатая таблица, где выделяется каждая четная строка                                        |
| `components`   | `TableComponents<DataSource>`                       | -            | Свойство для переопределения элементов таблицы                                                |
| `fixedHeader`  | `boolean`                                           | `false`      | Зафиксировать шапку таблицы при скролле                                                       |
| `rowKey`       | `string` \| `(record: DataSource) => React.Key`     | -            | Уникальный ключ строки может быть строкой или функцией, которая возвращает React.Key         |

### ColumnProps (свойства столбцов)

| Свойство                  | Тип                                     | По умолчанию | Описание                                                                  |
| ------------------------- | --------------------------------------- | ------------ | ------------------------------------------------------------------------- |
| `title`                   | `React.ReactNode`                       | -            | Текст для заголовка таблицы                                               |
| `key`                     | `React.Key`                             | -            | Уникальный идентификатор для каждой ячейки заголовка таблицы              |
| `kind`                    | `'default'` \| `'tree'`                 | `'default'`  | Тип ячеек столбца                                                         |
| `dataIndex`               | `string`                                | -            | Определяет по какому ключу из DataSource получать значение для текущего столбца |
| `align`                   | `'left'` \| `'center'` \| `'right'`     | `'left'`     | Положение контента в столбце                                              |
| `setCellProps`            | `(params) => CellProps`                 | -            | Устанавливает свойства для конкретной ячейки                              |
| `renderCellContent`       | `(params) => React.ReactNode`           | -            | Отображает содержимое для конкретной ячейки                               |
| `setHeaderCellProps`      | `(params) => HeaderCellProps`           | -            | Устанавливает свойства для ячеек в шапке таблицы                          |
| `renderHeaderCellContent` | `(params) => React.ReactNode`           | -            | Отображает содержимое для конкретной ячейки заголовка                     |
| `width`                   | `number`                                | -            | Ширина столбца в пикселях                                                 |
| `sortOrder`               | `'ascend'` \| `'descend'` \| `null`     | -            | Текущий порядок сортировки                                                |
| `sortable`                | `boolean`                               | `false`      | Задает возможность сортировки столбца                                     |

## Примеры использования

### Базовая таблица

```tsx
import * as React from 'react'
import { Table, ColumnProps, RecordDataSource } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

const BasicTable = () => {
  const dataSource: DataSource[] = [
    { name: 'Vasya', role: 'developer', key: 1 },
    { name: 'Slava', role: 'developer', key: 2 },
    { name: 'Anton', role: 'manager', key: 3 },
    { name: 'Artem', role: 'designer', key: 4 },
    { name: 'Fillip', role: 'designer', key: 5 },
  ]

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
    },
  ]

  return <Table dataSource={dataSource} columns={columns} />
}
```

### Таблица с фиксированной шириной столбцов

```tsx
import * as React from 'react'
import { Table, ColumnProps, RecordDataSource, RowProps } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

const FixedWidthTable = () => {
  const dataSource: DataSource[] = [
    { name: 'Vasya', role: 'developer', key: 1 },
    { name: 'Slava', role: 'developer', key: 2 },
    { name: 'Anton', role: 'manager', key: 3 },
    { name: 'Artem', role: 'designer', key: 4 },
    { name: 'Fillip', role: 'designer', key: 5 },
  ]

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      width: 300,
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
    },
  ]

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      tableLayout="fixed"
      setRowProps={(params) => {
        return {
          'data-name': params.row.name,
        } as RowProps
      }}
    />
  )
}
```

### Таблица с сортировкой

```tsx
import * as React from 'react'
import { Table, ColumnProps, RecordDataSource, TableEventType } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>

const SortableTable = () => {
  const [dataSource, setDataSource] = React.useState<DataSource[]>([
    { name: 'Vasya', role: 'developer', key: 1 },
    { name: 'Slava', role: 'developer', key: 2 },
    { name: 'Anton', role: 'manager', key: 3 },
    { name: 'Artem', role: 'designer', key: 4 },
    { name: 'Fillip', role: 'designer', key: 5 },
  ])

  const [sortParams, setSortParams] = React.useState({
    key: 'name',
    order: 'ascend' as 'ascend' | 'descend' | null,
  })

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      sortable: true,
      sortOrder: sortParams.key === 'name' ? sortParams.order : null,
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
      sortable: true,
      sortOrder: sortParams.key === 'role' ? sortParams.order : null,
    },
  ]

  const handleTableChange = (params: TableEventType<DataSource>) => {
    if (params.type === 'sort') {
      const { key, order } = params
      setSortParams({ key, order })
      
      if (order) {
        const sortedData = [...dataSource].sort((a, b) => {
          const aValue = a[key as keyof DataSource]
          const bValue = b[key as keyof DataSource]
          
          if (order === 'ascend') {
            return String(aValue).localeCompare(String(bValue))
          }
          return String(bValue).localeCompare(String(aValue))
        })
        
        setDataSource(sortedData)
      } else {
        // Вернуть исходные данные если сортировка отключена
      }
    }
  }

  return (
    <Table 
      dataSource={dataSource} 
      columns={columns} 
      onChange={handleTableChange}
    />
  )
}
```

### Пользовательская настройка компонентов таблицы

Таблицу можно настроить, переопределив ее компоненты с помощью свойства `components`:

```tsx
import * as React from 'react'
import { Table, ColumnProps, RecordDataSource } from '@v-uik/base'

type DataSource = RecordDataSource<{ name: string; role: string }>
type Props = React.HTMLAttributes<HTMLDivElement>

const TableComponent = (props) => (
  <div {...props} style={{ height: 'auto' }} />
)

const RowComponent = (props) => (
  <div {...props} style={{ display: 'flex' }} />
)

const CellComponent = (props) => (
  <div {...props} style={{ flex: 1, padding: '8px' }} />
)

const DivComponent = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
  <div ref={ref} {...props} />
))

const CustomizeTableComponents = () => {
  const dataSource: DataSource[] = [
    { name: 'Vasya', role: 'developer', key: 1 },
    { name: 'Slava', role: 'developer', key: 2 },
    { name: 'Anton', role: 'manager', key: 3 },
  ]

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
    },
  ]

  return (
    <Table
      components={{
        table: TableComponent,
        head: {
          wrapper: DivComponent,
          row: RowComponent,
          cell: CellComponent,
        },
        body: {
          wrapper: DivComponent,
          row: RowComponent,
          cell: CellComponent,
        },
      }}
      dataSource={dataSource}
      columns={columns}
    />
  )
}
```

## Стилизация

Компонент Table использует следующие CSS-классы для стилизации:

| Класс                | Описание                                        |
| -------------------- | ----------------------------------------------- |
| `table`              | Стиль для таблицы                               |
| `tableWrapper`       | Стиль для контейнера таблицы                    |
| `header`             | Стиль для заголовка таблицы                     |
| `body`               | Стиль для тела таблицы                          |
| `row`                | Стиль для строки таблицы                        |
| `cell`               | Стиль для ячейки таблицы                        |
| `headerCell`         | Стиль для ячейки заголовка                      |
| `hoverable`          | Стиль для hover-эффекта строк                   |
| `stripe`             | Стиль для полосатой таблицы                     |
| `cellAlignLeft`      | Стиль для выравнивания содержимого ячейки влево |
| `cellAlignCenter`    | Стиль для выравнивания содержимого ячейки по центру |
| `cellAlignRight`     | Стиль для выравнивания содержимого ячейки вправо |
| `bordered`           | Стиль для таблицы с границами                  |
| `sortable`           | Стиль для сортируемого столбца                  |
| `sortIcon`           | Стиль для иконки сортировки                     | 