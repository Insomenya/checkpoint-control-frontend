import { FC } from 'react';
import { Box, Button, createUseStyles, DatePicker, Select } from '@v-uik/base';
import { X } from '@v-uik/icons';
import { DIRECTION_OPTIONS, EXPEDITION_TYPE_OPTIONS, STATUS_OPTIONS, ZONE_OPTIONS } from '../constants';

const useStyles = createUseStyles((theme) => ({
  filtersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  filterRow: {
    display: 'flex',
    gap: theme.spacing(4)
  },
  filterItem: {
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    display: 'flex',
    alignItems: 'flex-end'
  },
  resetButton: {
    minWidth: 'auto'
  }
}));

type ReportFiltersProps = {
  onFilterChange: (filters: ReportFilters) => void;
  filterValues: ReportFilters;
};

export type ReportFilters = {
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  direction: string;
  status: string;
  expeditionType: string;
  zoneId: string;
};

export const ReportFilters: FC<ReportFiltersProps> = ({ onFilterChange, filterValues }) => {
  const classes = useStyles();

  const handleStartDateChange = (date: Date | null) => {
    onFilterChange({
      ...filterValues,
      dateRange: {
        ...filterValues.dateRange,
        startDate: date
      }
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    onFilterChange({
      ...filterValues,
      dateRange: {
        ...filterValues.dateRange,
        endDate: date
      }
    });
  };

  const handleResetDates = () => {
    onFilterChange({
      ...filterValues,
      dateRange: {
        startDate: null,
        endDate: null
      }
    });
  };

  const handleDirectionChange = (value: string) => {
    onFilterChange({
      ...filterValues,
      direction: value
    });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({
      ...filterValues,
      status: value
    });
  };

  const handleExpeditionTypeChange = (value: string) => {
    onFilterChange({
      ...filterValues,
      expeditionType: value
    });
  };

  const handleZoneChange = (value: string) => {
    onFilterChange({
      ...filterValues,
      zoneId: value
    });
  };

  return (
    <Box className={classes.filtersContainer}>
      {/* Первая строка фильтров - Даты */}
      <Box className={classes.filterRow}>
        <Box className={classes.filterItem}>
          <DatePicker
              inputProps={{
                fullWidth: true,
                placeholder: 'дд.мм.гггг'
              }}
              label="Дата с"
              value={filterValues.dateRange.startDate}
              onChange={handleStartDateChange}
              size="sm"
            />
        </Box>
        <Box className={classes.filterItem}>
          <DatePicker
              inputProps={{
                fullWidth: true,
                placeholder: 'дд.мм.гггг'
              }}
              label="Дата по"
              value={filterValues.dateRange.endDate}
              onChange={handleEndDateChange}
              size="sm"
            />
        </Box>
        <Box className={classes.filterItem}>
          <Button
            kind="outlined"
            color="error"
            size="sm"
            prefixIcon={<X />}
            onClick={handleResetDates}
            className={classes.resetButton}
            disabled={!filterValues.dateRange.startDate && !filterValues.dateRange.endDate}
          >
            Сбросить
          </Button>
        </Box>
      </Box>
      
      {/* Вторая строка фильтров - Направление и Тип экспедиции */}
      <Box className={classes.filterRow}>
        <Box className={classes.filterItem}>
          <Select
            label="Направление"
            options={DIRECTION_OPTIONS}
            value={filterValues.direction}
            onChange={handleDirectionChange}
            size="sm"
          />
        </Box>
        
        <Box className={classes.filterItem}>
          <Select
            label="Тип экспедиции"
            options={EXPEDITION_TYPE_OPTIONS}
            value={filterValues.expeditionType}
            onChange={handleExpeditionTypeChange}
            size="sm"
          />
        </Box>
      </Box>
      
      {/* Третья строка фильтров - Статус и Зона КПП */}
      <Box className={classes.filterRow}>
        <Box className={classes.filterItem}>
          <Select
            label="Статус"
            options={STATUS_OPTIONS}
            value={filterValues.status}
            onChange={handleStatusChange}
            size="sm"
          />
        </Box>
        
        <Box className={classes.filterItem}>
          <Select
            label="Зона"
            options={ZONE_OPTIONS}
            value={filterValues.zoneId}
            onChange={handleZoneChange}
            size="sm"
          />
        </Box>
      </Box>
    </Box>
  );
}; 