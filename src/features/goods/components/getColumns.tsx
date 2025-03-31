import { Good } from "@/models/goods";
import { type ColumnProps } from "@v-uik/base";

export const getColumns = (): ColumnProps<Good>[] => [
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
        key: 'quantity',
        dataIndex: 'quantity',
        title: 'Количество',
        width: 100,
        align: 'right',
        sortable: true
    },
    {
        key: 'unitOfMeasurement',
        dataIndex: 'unitOfMeasurement',
        title: 'ЕИ',
        width: 50,
        sortable: true
    }
];
