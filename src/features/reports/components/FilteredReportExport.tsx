import { FC } from 'react';
import { Box, Button, createUseStyles } from '@v-uik/base';
import { Printer, TableExport } from '@v-uik/icons';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DateFormat } from '@/models/common';
import { Alignment, Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { ExpeditionStatusResponseDTO } from '@/models/expeditions';
import { ReportFilters } from './ReportFilters';

(pdfMake as any).vfs = pdfFonts.vfs;

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: theme.spacing(2),
    marginTop: `-${theme.spacing(12)}`
  },
  button: {
    minWidth: 170
  }
}));

type FilteredReportExportProps = {
  expeditions: ExpeditionStatusResponseDTO[];
  title?: string;
  filters?: ReportFilters;
};

export const FilteredReportExport: FC<FilteredReportExportProps> = ({
  expeditions,
  title = 'Отчет по экспедициям',
  filters
}) => {
  const classes = useStyles();

  const exportToPDF = () => {
    if (!expeditions || expeditions.length === 0) return;

    const formatHeader = (text: string): Content => ({
      text,
      style: 'sectionHeader',
      margin: [0, 10, 0, 5] as [number, number, number, number]
    });

    const tableHeaders = [
      'Номер',
      'Направление',
      'Тип',
      'Отправитель',
      'Получатель',
      'ФИО',
      'Гос. номер',
      'Зона',
      'Статус',
      'Дата подтверждения'
    ];

    const tableRows = expeditions.map(expedition => {
      const lastConfirmation = expedition.last_confirmation;
      return [
        expedition.name || '-',
        expedition.direction_display || '-',
        expedition.type_display || '-',
        expedition.sender_name || '-',
        expedition.receiver_name || '-',
        expedition.full_name || '-',
        expedition.license_plate || '-',
        lastConfirmation ? lastConfirmation.zone_name : '-',
        lastConfirmation ? lastConfirmation.status_display : '-',
        lastConfirmation && lastConfirmation.confirmed_at ? 
          format(new Date(lastConfirmation.confirmed_at), 'dd.MM.yyyy HH:mm', { locale: ru }) : 
          '-'
      ];
    });

    // Создаем массив ширин колонок с пропорциональными значениями
    const columnWidths = [
      'auto', // Номер
      'auto', // Направление
      'auto', // Тип
      '*',    // Отправитель (более широкая колонка)
      '*',    // Получатель (более широкая колонка)
      '*',    // ФИО (более широкая колонка)
      'auto', // Гос. номер
      'auto', // Зона
      'auto', // Статус
      'auto'  // Дата подтверждения
    ];

    // Информация о примененных фильтрах
    const filterInfo: Content[] = [];
    
    if (filters) {
      const filterTexts: string[] = [];
      
      if (filters.dateRange.startDate || filters.dateRange.endDate) {
        let dateText = 'Период: ';
        if (filters.dateRange.startDate) {
          dateText += `с ${format(filters.dateRange.startDate, DateFormat.RuDateOnly)}`;
        }
        if (filters.dateRange.endDate) {
          dateText += `${filters.dateRange.startDate ? ' ' : ''}по ${format(filters.dateRange.endDate, DateFormat.RuDateOnly)}`;
        }
        filterTexts.push(dateText);
      }
      
      if (filters.direction) {
        filterTexts.push(`Направление: ${filters.direction === 'IN' ? 'Въезд' : 'Выезд'}`);
      }
      
      if (filters.expeditionType) {
        const typeMap: Record<string, string> = {
          'auto': 'Авто',
          'selfout': 'Самовынос',
          'selfauto': 'Самовывоз'
        };
        filterTexts.push(`Тип экспедиции: ${typeMap[filters.expeditionType] || filters.expeditionType}`);
      }
      
      if (filters.status) {
        const statusMap: Record<string, string> = {
          'confirmed': 'Подтверждено',
          'cancelled': 'Отклонено'
        };
        filterTexts.push(`Статус: ${statusMap[filters.status] || filters.status}`);
      }
      
      if (filters.zoneId) {
        const zoneMap: Record<string, string> = {
          '1': 'КПП',
          '2': 'Бюро пропусков',
          '3': 'Склад'
        };
        filterTexts.push(`Зона: ${zoneMap[filters.zoneId] || filters.zoneId}`);
      }
      
      if (filterTexts.length > 0) {
        filterInfo.push({
          text: 'Применены фильтры:',
          style: 'subheader',
          margin: [0, 5, 0, 5] as [number, number, number, number]
        });
        
        filterInfo.push({
          ul: filterTexts,
          margin: [0, 0, 0, 10] as [number, number, number, number]
        });
      }
    }

    const content: Content[] = [
      {
        alignment: 'right' as Alignment,
        text: format(new Date(), DateFormat.RuDateOnly)
      },
      {
        text: title,
        style: 'header',
        alignment: 'center' as Alignment,
        margin: [0, 5, 0, 10] as [number, number, number, number]
      },
      ...filterInfo,
      {
        text: `Всего экспедиций: ${expeditions.length}`,
        margin: [0, 0, 0, 5] as [number, number, number, number]
      },
      {
        table: {
          headerRows: 1,
          widths: columnWidths,
          body: [tableHeaders, ...tableRows]
        },
        layout: {
          hLineWidth: (i, node) => (i === 0 || i === 1 || i === node.table.body.length) ? 1 : 0,
          vLineWidth: () => 0,
          paddingLeft: (i) => 4,
          paddingRight: (i) => 4,
          paddingTop: (i) => 2,
          paddingBottom: (i) => 2
        }
      }
    ];

    const docDefinition: TDocumentDefinitions = {
      pageOrientation: 'landscape',
      content: content,
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 5] as [number, number, number, number]
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 5, 0, 3] as [number, number, number, number]
        },
        sectionHeader: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5] as [number, number, number, number]
        }
      },
      defaultStyle: {
        fontSize: 8 // Уменьшаем размер шрифта для лучшего размещения данных
      }
    };

    pdfMake.createPdf(docDefinition).download(`${title}_${format(new Date(), DateFormat.IsoDateOnly)}.pdf`);
  };

  const exportToExcel = () => {
    if (!expeditions || expeditions.length === 0) return;

    const worksheet = XLSXUtils.json_to_sheet(
      expeditions.map(expedition => {
        const lastConfirmation = expedition.last_confirmation;
        return {
          'Номер': expedition.name || '',
          'Направление': expedition.direction_display || '',
          'Тип': expedition.type_display || '',
          'Отправитель': expedition.sender_name || '',
          'Получатель': expedition.receiver_name || '',
          'ФИО': expedition.full_name || '',
          'Гос. номер ТС': expedition.license_plate || '',
          'Модель ТС': expedition.vehicle_model || '',
          'Зона': lastConfirmation ? lastConfirmation.zone_name : '',
          'Статус': lastConfirmation ? lastConfirmation.status_display : '',
          'Дата подтверждения': lastConfirmation && lastConfirmation.confirmed_at ? 
            format(new Date(lastConfirmation.confirmed_at), 'dd.MM.yyyy HH:mm', { locale: ru }) : 
            '',
          'Дата начала': expedition.start_date ? 
            format(new Date(expedition.start_date), DateFormat.RuDateOnly, { locale: ru }) : 
            '',
          'Дата окончания': expedition.end_date ? 
            format(new Date(expedition.end_date), DateFormat.RuDateOnly, { locale: ru }) : 
            ''
        };
      })
    );

    const workbook = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(workbook, worksheet, 'Экспедиции');
    XLSXWriteFile(workbook, `${title}_${format(new Date(), DateFormat.IsoDateOnly)}.xlsx`);
  };

  return (
    <Box className={classes.container}>
      <Button
        kind="outlined"
        color="primary"
        size="sm"
        prefixIcon={<Printer />}
        onClick={exportToPDF}
        disabled={!expeditions || expeditions.length === 0}
        className={classes.button}
      >
        Экспорт в PDF
      </Button>
      <Button
        kind="outlined"
        color="primary"
        size="sm"
        prefixIcon={<TableExport />}
        onClick={exportToExcel}
        disabled={!expeditions || expeditions.length === 0}
        className={classes.button}
      >
        Экспорт в Excel
      </Button>
    </Box>
  );
}; 