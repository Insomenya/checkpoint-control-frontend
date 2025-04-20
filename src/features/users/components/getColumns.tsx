import { UserDTO } from "@/models/users";
import { Box, type ColumnProps } from "@v-uik/base";

type GetColumnsProps = {
    textCellClassName: string;
};

export const getColumns = ({ textCellClassName }: GetColumnsProps): ColumnProps<UserDTO>[] => [
    {
        key: 'username',
        dataIndex: 'username',
        title: 'Логин',
        sortable: true
    },
    {
        key: 'role_display',
        dataIndex: 'role_display',
        title: 'Роль в системе',
        sortable: true
    },
    {
        key: 'checkpoint_name',
        dataIndex: 'checkpoint_name',
        title: 'Название КПП',
        sortable: true,
        align: 'left',
        width: 160,
        renderCellContent: ({ row }) => {
            return <Box className={textCellClassName}>{row.checkpoint_name || '-'}</Box>
        }
    },
    {
        key: 'is_password_set',
        dataIndex: 'is_password_set',
        title: 'Пароль установлен',
        sortable: true,
        renderCellContent: ({ row }) => {
            return <Box className={textCellClassName}>{row.is_password_set ? 'Да' : 'Нет'}</Box>
        }
    }
];
