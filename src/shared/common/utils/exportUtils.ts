import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import { format } from 'date-fns';
import { DateFormat } from '@/models/common';
import { Alignment } from 'pdfmake/interfaces';
import { ColumnProps } from '@v-uik/base';

(pdfMake as any).vfs = pdfFonts.vfs;

/**
 * Экспорта данных в PDF с горизонтальной ориентацией для таблиц с большим количеством колонок
 */
export const exportToPDF = <T extends object>(
  fileName: string,
  columns: ColumnProps<T>[],
  items: T[]
): void => {
  if (!items.length) {
    return;
  }

  const headers = columns.map((col) => col.title || '');
  const data = items.map((item) => {
    const docDataItem: any[] = [];

    columns.forEach((col) => {
      let value = item[col.key as keyof T];
      
      if (value === undefined || value === null) {
        docDataItem.push('');
      } else {
        docDataItem.push(String(value));
      }
    });

    return docDataItem;
  });

  const shouldUseLandscape = columns.length > 4;
  
  const widths = Array(columns.length).fill('*');

  const docDefinition = {
    pageOrientation: shouldUseLandscape ? 'landscape' : 'portrait' as ('portrait' | 'landscape'),
    content: [
      {
        alignment: 'right' as Alignment,
        columns: [
          {
            text: ''
          },
          {
            text: format(new Date(), DateFormat.RuDateOnly)
          },
        ]
      },
      '\n\n',
      {
        text: fileName,
        style: 'header',
      },
      {
        table: {
          headerRows: 1,
          widths: widths,
          body: [headers, ...data],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10] as [number, number, number, number]
      }
    },
    defaultStyle: {
      fontSize: 10
    }
  };

  pdfMake.createPdf(docDefinition).download(`${fileName}.pdf`);
};

/**
 * Экспорт данных в Excel
 */
export const exportToExcel = <T extends object>(
  fileName: string,
  columns: ColumnProps<T>[],
  items: T[]
): void => {
  if (!items.length) {
    return;
  }

  const worksheetData = items.map((item) => {
    const worksheetDataItem: any[] = [];

    columns.forEach((col) => {
      worksheetDataItem.push(item[col.key as keyof T]);
    });

    return worksheetDataItem;
  });

  const worksheet = XLSXUtils.aoa_to_sheet([[...columns.map((col) => col.title || '')], ...worksheetData]);
  const workbook = XLSXUtils.book_new();
  XLSXUtils.book_append_sheet(workbook, worksheet, fileName);
  XLSXWriteFile(workbook, `${fileName}.xlsx`);
}; 