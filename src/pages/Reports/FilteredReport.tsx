import { Suspense } from 'react';
import { CircularProgressCentered } from '@/shared/common/atoms';
import { FilteredReportPage } from './FilteredReportPage';

export const FilteredReport = () => {
  return (
    <Suspense fallback={<CircularProgressCentered />}>
      <FilteredReportPage />
    </Suspense>
  );
};
