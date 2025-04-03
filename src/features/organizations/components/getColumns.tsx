import { Organization } from "@/models/organizations";
import { type ColumnProps } from "@v-uik/base";

export const getColumns = (): ColumnProps<Organization>[] => [
    {
        key: 'name',
        dataIndex: 'name',
        title: 'Название',
        sortable: true
    },
    {
        key: 'address',
        dataIndex: 'address',
        title: 'Адрес',
        sortable: true
    },
    {
        key: 'contactPhone',
        dataIndex: 'contactPhone',
        title: 'Контактный номер',
        sortable: true
    },
];
