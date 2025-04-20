import { DateFormat } from '@/models/common';
import { format } from 'date-fns';
import { ColumnProps } from '@v-uik/base';
import { ExpeditionDTO } from '@/models/expeditions';

export const getColumns = (): ColumnProps<ExpeditionDTO>[] => [
    {
        key: 'id',
        dataIndex: 'id',
        title: 'ID',
        width: 80,
    },
    {
        key: 'name',
        dataIndex: 'name',
        title: 'Название',
        width: 150,
    },
    {
        key: 'direction_display',
        dataIndex: 'direction_display',
        title: 'Направление',
        width: 120,
    },
    {
        key: 'type_display',
        dataIndex: 'type_display',
        title: 'Тип',
        width: 120,
    },
    {
        key: 'sender_name',
        dataIndex: 'sender_name',
        title: 'Отправитель',
        width: 180,
    },
    {
        key: 'receiver_name',
        dataIndex: 'receiver_name',
        title: 'Получатель',
        width: 180,
    },
    {
        key: 'full_name',
        dataIndex: 'full_name',
        title: 'ФИО',
        width: 180,
    },
    {
        key: 'license_plate',
        dataIndex: 'license_plate',
        title: 'Гос. номер ТС',
        width: 150,
    },
    {
        key: 'start_date',
        dataIndex: 'start_date',
        title: 'Дата начала',
        width: 150,
        renderCellContent: (params) => {
            const value = params.cell;
            return typeof value === 'string' ? format(new Date(value), DateFormat.RuDateOnly) : '';
        },
    },
    {
        key: 'end_date',
        dataIndex: 'end_date',
        title: 'Дата завершения',
        width: 150,
        renderCellContent: (params) => {
            const value = params.cell;
            return typeof value === 'string' ? format(new Date(value), DateFormat.RuDateOnly) : '';
        },
    },
]; 