import { FC, useCallback, useState } from 'react';
import { CircularProgress, Container, createUseStyles, Text } from '@v-uik/base';
import { PageFallback } from '@shared/common/molecules';
import { FilteredReportTable, ReportFilters, type ReportFilters as ReportFiltersType } from '@/features/reports/components';
import { useGetAllExpeditionsStatusQuery, useGetExpeditionsStatusByCheckpointQuery } from '@/api/expeditions/expeditionsApi';
import { useAppSelector } from '@store/store';
import { selectUserCheckpointId, selectUserRole } from '@store/auth/auth.selectors';
import { filterExpeditions } from '@/features/reports/helpers';
import { FAILED_TO_LOAD_MESSAGE } from '@/features/reports/constants';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(10)
  }
}));

const initialFilters: ReportFiltersType = {
  dateRange: {
    startDate: null,
    endDate: null
  },
  direction: '',
  status: '',
  expeditionType: '',
  zoneId: ''
};

export const FilteredReportPage: FC = () => {
  const classes = useStyles();
  const [filters, setFilters] = useState<ReportFiltersType>(initialFilters);
  const userRole = useAppSelector(selectUserRole);
  const userCheckpointId = useAppSelector(selectUserCheckpointId);
  
  const isOperator = userRole === 'operator';
  
  const { 
    data: logistExpeditionsData,
    isLoading: isLogistLoading,
    isError: isLogistError,
    refetch: refetchLogist
  } = useGetAllExpeditionsStatusQuery(undefined, { 
    skip: isOperator 
  });
  
  const { 
    data: operatorExpeditionsData,
    isLoading: isOperatorLoading,
    isError: isOperatorError,
    refetch: refetchOperator
  } = useGetExpeditionsStatusByCheckpointQuery(
    userCheckpointId || 0, 
    { 
      skip: !isOperator || userCheckpointId === undefined,
    }
  );
  
  const expeditionsData = isOperator ? operatorExpeditionsData : logistExpeditionsData;
  const isLoading = isOperator ? isOperatorLoading : isLogistLoading;
  const isError = isOperator ? isOperatorError : isLogistError;
  const refetch = isOperator ? refetchOperator : refetchLogist;
  
  const handleFilterChange = useCallback((newFilters: ReportFiltersType) => {
    setFilters(newFilters);
  }, []);
  
  const filteredExpeditions = filterExpeditions(expeditionsData, filters);
  
  const pageTitle = isOperator 
    ? 'Отчет по экспедициям в зоне КПП'
    : 'Отчет по всем экспедициям';
  
  const getPageCommon = () => {
    return (
      <Text kind="h4" gutterBottom>
        {pageTitle}
      </Text>
    );
  };

  if (isLoading) {
    return (
      <>
        {getPageCommon()}
        <Container className={classes.container}>
          <CircularProgress />
        </Container>
      </>
    );
  } else if (isError || !expeditionsData) {
    return (
      <>
        {getPageCommon()}
        <PageFallback message={FAILED_TO_LOAD_MESSAGE} refetch={refetch} />
      </>
    );
  }
  
  return (
    <>
      {getPageCommon()}
      
      <ReportFilters 
        onFilterChange={handleFilterChange}
        filterValues={filters}
      />
      
      <FilteredReportTable 
        expeditions={filteredExpeditions}
        title={pageTitle}
        filters={filters}
      />
    </>
  );
}; 