import { FC, useMemo } from 'react';
import { AppTable } from '@shared/common/organisms';
import { ExpeditionDTO } from '@/models/expeditions';
import { EXPEDITIONS_CUSTOM_FILTERS, MESSAGES } from '../constants';
import { getColumns } from './getColumns';

type ExpeditionTableProps = {
    expeditions: ExpeditionDTO[];
    isLoading: boolean;
};

export const ExpeditionTable: FC<ExpeditionTableProps> = ({ expeditions, isLoading }) => {
    const columns = useMemo(() => getColumns(), []);
    
    return (
        <AppTable
            fileName="Список экспедиций"
            columns={columns}
            items={expeditions}
            customFilters={EXPEDITIONS_CUSTOM_FILTERS}
            messages={MESSAGES}
            pdfExportable
            excelExportable
        />
    );
}; 