import { ColumnProps } from '@v-uik/base';

export type GoodItemType = {
  id: number;
  name: string;
  description: string;
  unit_of_measurement_display: string;
  quantity: number;
};

export const getInvoiceGoodsColumns = (): ColumnProps<GoodItemType>[] => [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Название',
    width: 150,
    sortable: true
  },
  {
    key: 'description',
    dataIndex: 'description',
    title: 'Описание',
    sortable: true
  },
  {
    key: 'unit_of_measurement_display',
    dataIndex: 'unit_of_measurement_display',
    title: 'Единица измерения',
    width: 150,
    sortable: true
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: 'Количество',
    width: 100,
    sortable: true
  }
]; 