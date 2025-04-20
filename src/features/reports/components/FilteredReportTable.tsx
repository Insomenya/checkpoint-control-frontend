import { FC, useMemo } from 'react';
import { AppTable } from '@/shared/common/organisms/AppTable';
import { Box, createUseStyles } from '@v-uik/base';
import { FilteredReportExport } from './FilteredReportExport';
import { ExpeditionStatusResponseDTO } from '@/models/expeditions';
import { getReportColumns } from './getColumns';
import { MESSAGES } from '../constants';
import { ReportFilters } from './ReportFilters';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

type FilteredReportTableProps = {
  expeditions: ExpeditionStatusResponseDTO[];
  title?: string;
  filters: ReportFilters;
};

export const FilteredReportTable: FC<FilteredReportTableProps> = ({ 
  expeditions,
  title = 'Отчет по экспедициям',
  filters
}) => {
  const classes = useStyles();
  const columns = useMemo(() => getReportColumns(), []);

  return (
    <Box className={classes.container}>
      <FilteredReportExport 
        expeditions={expeditions}
        title={title}
        filters={filters}
      />
      
      <AppTable 
        fileName={title}
        columns={columns}
        items={expeditions}
        hideDefaultFilter={true}
        pdfExportable={false}
        excelExportable={false}
        messages={MESSAGES}
      />
    </Box>
  );
}; 