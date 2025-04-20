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
        key: 'zone_id',
        dataIndex: 'zone_id',
        title: 'Принадлежит к зоне',
        sortable: true,
        renderCellContent: ({ row }) => {
            if (row.zone_name) {
                return <Box className={textCellClassName}>{row.zone_name}</Box>;
            }
            
            let zoneName = '';
            switch(row.zone_id) {
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

            return <Box className={textCellClassName}>{zoneName}</Box>;
        }
    },
];
