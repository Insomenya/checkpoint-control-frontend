import { ExpeditionStatusResponseDTO } from '@/models/expeditions';
import { ReportFilters } from '../components/ReportFilters';
import { isBefore, isAfter, parseISO } from 'date-fns';

export const filterExpeditions = (
  expeditionsData: ExpeditionStatusResponseDTO[] | undefined,
  filters: ReportFilters
): ExpeditionStatusResponseDTO[] => {
  if (!expeditionsData) return [];
  
  return expeditionsData.filter(expedition => {
    if (filters.direction && expedition.direction !== filters.direction) {
      return false;
    }
    
    if (filters.expeditionType && expedition.type !== filters.expeditionType) {
      return false;
    }
    
    if (filters.status && expedition.last_confirmation?.status !== filters.status) {
      return false;
    }
    
    if (filters.zoneId && filters.zoneId !== '') {
      const selectedZoneId = Number(filters.zoneId);
      
      if (!expedition.last_confirmation) {
        return false;
      }
      
      if (expedition.last_confirmation.zone_id !== selectedZoneId) {
        return false;
      }
    }
    
    if (expedition.last_confirmation && (filters.dateRange.startDate || filters.dateRange.endDate)) {
      const confirmationDate = parseISO(expedition.last_confirmation.confirmed_at);
      
      if (filters.dateRange.startDate && isBefore(confirmationDate, filters.dateRange.startDate)) {
        return false;
      }
      
      if (filters.dateRange.endDate && isAfter(confirmationDate, filters.dateRange.endDate)) {
        return false;
      }
    }
    
    return true;
  });
}; 