import { Checkpoint } from "@/models/checkpoints";
import { Box, type ColumnProps } from "@v-uik/base";
import { ZONE_NAMES } from "../constants";



export const getColumns = (textCellClassName: string): ColumnProps<Checkpoint>[] => [
    {
        key: 'name',
        dataIndex: 'name',
        title: 'Название',
        sortable: true
    },
    {
        key: 'zone',
        dataIndex: 'zone',
        title: 'Принадлежит к зоне',
        sortable: true,
        renderCellContent: ({ row }) => {
            let zoneName = '';

            switch(row.zone) {
                case 1:
                    zoneName = ZONE_NAMES.KPP;
                    break;
                case 2:
                    zoneName = ZONE_NAMES.BP;
                    break;
                case 3:
                    zoneName = ZONE_NAMES.WAREHOUSE;
                    break;
            }

            return <Box className={textCellClassName}>{zoneName}</Box>
        }
    },
];
