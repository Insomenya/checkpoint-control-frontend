import { FC, useMemo } from 'react';
import { Box, Button, createUseStyles } from '@v-uik/base';
import { Printer, TableExport } from '@v-uik/icons';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import { format } from 'date-fns';
import { DateFormat } from '@/models/common';
import { Alignment, Content, TDocumentDefinitions } from 'pdfmake/interfaces';

(pdfMake as any).vfs = pdfFonts.vfs;

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    maxWidth: 250
  }
}));

type ExtendedGoodItemType = {
  id: number;
  name: string;
  description: string;
  unit_of_measurement_display: string;
  quantity: number;
  invoice_number: string;
};

type ExpeditionStatusReportProps = {
  expedition: any;
  confirmation: any;
};

export const ExpeditionStatusReport: FC<ExpeditionStatusReportProps> = ({
  expedition,
  confirmation
}) => {
  const classes = useStyles();
  
  const goodsData: ExtendedGoodItemType[] = useMemo(() => {
    if (!expedition || !expedition.invoices) return [];
    
    return expedition.invoices.flatMap((invoice: any) => 
      invoice.invoice_goods.map((invoiceGood: any) => ({
        id: invoiceGood.id,
        name: invoiceGood.good.name,
        description: invoiceGood.good.description,
        unit_of_measurement_display: invoiceGood.good.unit_of_measurement_display,
        quantity: invoiceGood.quantity,
        invoice_number: invoice.number
      }))
    );
  }, [expedition]);

  const exportToPDF = () => {
    if (!expedition) return;

    const formatSection = (title: string, fields: { label: string; value: string }[]): Content[] => {
      return [
        { text: title, style: 'sectionHeader' },
        {
          table: {
            widths: ['30%', '70%'],
            body: fields.map(field => [field.label, field.value || '-'])
          },
          layout: 'noBorders'
        },
        { text: '', margin: [0, 10, 0, 0] as [number, number, number, number] }
      ];
    };

    const expeditionFields = [
      { label: 'Номер экспедиции', value: expedition.name },
      { label: 'Направление', value: expedition.direction_display },
      { label: 'Тип', value: expedition.type_display },
      { label: 'Отправитель', value: expedition.sender_name },
      { label: 'Получатель', value: expedition.receiver_name },
      { label: 'ФИО', value: expedition.full_name },
      { label: 'Номер паспорта', value: expedition.passport_number },
      { label: 'Номер телефона', value: expedition.phone_number },
      { label: 'Гос. номер ТС', value: expedition.license_plate },
      { label: 'Модель ТС', value: expedition.vehicle_model },
      { label: 'Дата начала', value: expedition.start_date },
      { label: 'Дата окончания', value: expedition.end_date || '-' }
    ];

    const confirmationFields = confirmation ? [
      { label: 'Статус', value: confirmation.status_display },
      { label: 'Подтверждено', value: confirmation.confirmed_by_username },
      { label: 'Зона', value: confirmation.zone_name },
      { label: 'Дата подтверждения', value: confirmation.confirmed_at }
    ] : [];

    const goodsHeaders = ['Наименование', 'Описание', 'Единица измерения', 'Количество', 'Номер накладной'];
    const goodsRows = goodsData.map(item => [
      item.name || '-',
      item.description || '-',
      item.unit_of_measurement_display || '-',
      item.quantity.toString() || '-',
      item.invoice_number || '-'
    ]);

    const content: Content[] = [
      {
        alignment: 'right' as Alignment,
        text: format(new Date(), DateFormat.RuDateOnly)
      },
      {
        text: 'Отчет по экспедиции',
        style: 'header',
        alignment: 'center' as Alignment,
        margin: [0, 10, 0, 20] as [number, number, number, number]
      }
    ];

    content.push(...formatSection('Данные экспедиции', expeditionFields));

    if (confirmation) {
      content.push(...formatSection('Информация о подтверждении', confirmationFields));
    }

    content.push(
      {
        text: 'Товары',
        style: 'sectionHeader'
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', 'auto', 'auto', 'auto'],
          body: [goodsHeaders, ...goodsRows]
        },
        layout: 'lightHorizontalLines'
      }
    );

    const docDefinition: TDocumentDefinitions = {
      pageOrientation: 'portrait',
      content: content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number]
        },
        sectionHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 10] as [number, number, number, number]
        }
      },
      defaultStyle: {
        fontSize: 10
      }
    };

    pdfMake.createPdf(docDefinition).download(`Экспедиция_${expedition.name}.pdf`);
  };

  const exportToExcel = () => {
    if (!expedition) return;

    const expeditionSheet = [
      ['Отчет по экспедиции', ''],
      ['Дата формирования', format(new Date(), DateFormat.RuDateOnly)],
      ['', ''],
      ['Данные экспедиции', ''],
      ['Номер экспедиции', expedition.name],
      ['Направление', expedition.direction_display],
      ['Тип', expedition.type_display],
      ['Отправитель', expedition.sender_name],
      ['Получатель', expedition.receiver_name],
      ['ФИО', expedition.full_name],
      ['Номер паспорта', expedition.passport_number],
      ['Номер телефона', expedition.phone_number],
      ['Гос. номер ТС', expedition.license_plate],
      ['Модель ТС', expedition.vehicle_model],
      ['Дата начала', expedition.start_date],
      ['Дата окончания', expedition.end_date || '-']
    ];

    if (confirmation) {
      expeditionSheet.push(
        ['', ''],
        ['Информация о подтверждении', ''],
        ['Статус', confirmation.status_display],
        ['Подтверждено', confirmation.confirmed_by_username],
        ['Зона', confirmation.zone_name],
        ['Дата подтверждения', confirmation.confirmed_at]
      );
    }

    const goodsHeaders = ['Наименование', 'Описание', 'Единица измерения', 'Количество', 'Номер накладной'];
    const goodsItems = [
      goodsHeaders,
      ...goodsData.map(item => [
        item.name,
        item.description,
        item.unit_of_measurement_display,
        item.quantity,
        item.invoice_number
      ])
    ];

    const workbook = XLSXUtils.book_new();
    
    const expeditionWs = XLSXUtils.aoa_to_sheet(expeditionSheet);
    XLSXUtils.book_append_sheet(workbook, expeditionWs, 'Экспедиция');
    
    const goodsWs = XLSXUtils.aoa_to_sheet(goodsItems);
    XLSXUtils.book_append_sheet(workbook, goodsWs, 'Товары');
    
    XLSXWriteFile(workbook, `Экспедиция_${expedition.name}.xlsx`);
  };

  return (
    <Box className={classes.container}>
      <Button
        kind="outlined"
        color="primary"
        size="sm"
        prefixIcon={<Printer />}
        onClick={exportToPDF}
        disabled={!expedition}
        fullWidth
      >
        Экспорт в PDF
      </Button>
      <Button
        kind="outlined"
        color="primary"
        size="sm"
        prefixIcon={<TableExport />}
        onClick={exportToExcel}
        disabled={!expedition}
        fullWidth
      >
        Экспорт в Excel
      </Button>
    </Box>
  );
}; 