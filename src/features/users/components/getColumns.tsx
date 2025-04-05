import { User } from "@/models/auth";
import { Checkpoint } from "@/models/checkpoints";
import { Box, CircularProgress, clsx, type ColumnProps } from "@v-uik/base";

type GetColumnsProps = {
    textCellClassName: string;
    headerCellClassName: string;
    isCheckpointsLoaded: boolean;
    checkpoints?: Checkpoint[];
};

export const getColumns = ({ textCellClassName, headerCellClassName, isCheckpointsLoaded, checkpoints }: GetColumnsProps): ColumnProps<User>[] => [
    {
        key: 'username',
        dataIndex: 'username',
        title: 'Логин',
        sortable: true
    },
    {
        key: 'fullName',
        dataIndex: 'fullName',
        title: 'Имя пользователя',
        sortable: true
    },
    {
        key: 'role',
        dataIndex: 'role',
        title: 'Роль в системе',
        sortable: true
    },
    {
        key: 'checkpoint_id',
        dataIndex: 'checkpoint_id',
        title: isCheckpointsLoaded ? 'Название КПП' : 'ID КПП',
        sortable: true,
        align: 'left',
        width: 160,
        renderCellContent: ({ row }) => {
            if (isCheckpointsLoaded) {
                const checkpointName = checkpoints?.find((checkpoint) => checkpoint.id == row.checkpoint_id)?.name;

                return <Box className={textCellClassName}>{checkpointName ? checkpointName : '-'}</Box>
            } else {
                return <Box className={textCellClassName}>{row.checkpoint_id ? row.checkpoint_id : '-'}</Box>
            }
        },
        renderHeaderCellContent: ({ title }) => {
            if (isCheckpointsLoaded) {
                return <Box className={textCellClassName}>{title}</Box>
            } else {
                return <Box className={clsx(textCellClassName, headerCellClassName)}>{title} <CircularProgress size="sm" thickness={2} color="black" /></Box>
            }
        },
    },
];
