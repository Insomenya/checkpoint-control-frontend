import { ColumnProps } from '@v-uik/base';
import { ExpeditionStatusResponseDTO } from '@/models/expeditions';
import { format } from 'date-fns';
import { DateFormat } from '@/models/common';
import { ru } from 'date-fns/locale';

export const getReportColumns = (): ColumnProps<ExpeditionStatusResponseDTO>[] => [
  {
    key: 'name',
    title: 'Номер',
    dataIndex: 'name',
    width: 120
  },
  {
    key: 'direction_display',
    title: 'Направление',
    dataIndex: 'direction_display',
    width: 100
  },
  {
    key: 'type_display',
    title: 'Тип',
    dataIndex: 'type_display',
    width: 100
  },
  {
    key: 'sender_name',
    title: 'Отправитель',
    dataIndex: 'sender_name',
    width: 150
  },
  {
    key: 'receiver_name',
    title: 'Получатель',
    dataIndex: 'receiver_name',
    width: 150
  },
  {
    key: 'full_name',
    title: 'ФИО',
    dataIndex: 'full_name',
    width: 150
  },
  {
    key: 'license_plate',
    title: 'Гос. номер',
    dataIndex: 'license_plate',
    width: 100
  },
  {
    key: 'zone',
    title: 'Зона',
    dataIndex: 'zone',
    width: 100,
    renderCellContent: ({ row }) => {
      return row.last_confirmation ? row.last_confirmation.zone_name : '-';
    }
  },
  {
    key: 'status',
    title: 'Статус',
    dataIndex: 'status',
    width: 100,
    renderCellContent: ({ row }) => {
      return row.last_confirmation ? row.last_confirmation.status_display : '-';
    }
  },
  {
    key: 'confirmed_at',
    title: 'Дата подтверждения',
    dataIndex: 'confirmed_at',
    width: 150,
    renderCellContent: ({ row }) => {
      if (!row.last_confirmation?.confirmed_at) return '-';
      
      // Преобразуем строковую дату в объект Date
      const date = new Date(row.last_confirmation.confirmed_at);
      
      // Форматируем дату в российском формате с временем
      return format(date, 'dd.MM.yyyy HH:mm', { locale: ru });
    }
  }
]; 