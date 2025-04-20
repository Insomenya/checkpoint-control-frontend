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
        key: 'unit_of_measurement_display',
        dataIndex: 'unit_of_measurement_display',
        title: 'Единица измерения',
        width: 150,
        sortable: true
    }
];
