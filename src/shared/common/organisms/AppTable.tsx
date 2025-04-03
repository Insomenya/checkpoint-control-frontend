import { FC, useCallback, useMemo, useState } from 'react';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.vfs;
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import { Box, Button, ColumnProps, createUseStyles, Input, notification, RecordDataSource, SortOrderProp, Table, TableEventType, TablePagination, TablePaginationType } from '@v-uik/base';
import { ErrorDescription } from '../atoms';
import { ICON_SIZE, Messages, MESSAGES } from '@shared/common/constants';
import { ButtonModalBundle, ModalProps } from './ButtonModalBundle';
import { Edit, Filter, PlaylistAdd, Printer, TableExport, Trash } from '@v-uik/icons';
import { format } from 'date-fns';
import { DateFormat, TableEditabilityOptions } from '@/models/common';
import { Alignment } from 'pdfmake/interfaces';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4)
  },
  tableHeader: {
    background: theme.ref.palette.electricBlue80
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  actionsRightSide: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    justifyContent: 'center'
  },
  paginationDivider: {
    borderTop: 0
  },
  iconButton: {
    padding: [theme.spacing(1), theme.spacing(0.5)],
    minWidth: theme.spacing(6),
    height: theme.spacing(6),
    display: 'flex',
    gap: theme.spacing(2),
    '& span': {
      display: 'flex',
      gap: theme.spacing(2)
    }
  }
}));

export type ModalOptions<T extends object> = {
  item: T | null;
}

type AppTableProps<T extends object> = {
    messages?: Messages;
    fileName: string;
    columns: ColumnProps<T>[];
    items: T[];
    ModalComponent?: FC<ModalProps<T, ModalOptions<T>>>;
    onAdd: (item: T) => void;
    onDelete: (item: T) => void;
    onUpdate: (item: T) => void;
    pdfExportable?: boolean;
    excelExportable?: boolean;
    editable?: TableEditabilityOptions;
}

export const AppTable = <T extends object> ({ messages = MESSAGES, fileName, columns, items, ModalComponent, onAdd, onDelete, onUpdate, pdfExportable, excelExportable, editable }: AppTableProps<T>) => {
  const classes = useStyles();
  const [orderBy, setOrderBy] = useState<keyof T | undefined>();
  const [sortOrder, setSortOrder] = useState<SortOrderProp>('none')
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleFilterChange = (value: string) => {
    const maxPages = Math.floor(filteredItems.length / itemsPerPage) || 1;
    setFilter(value);
    if (currentPage > maxPages) {
      setCurrentPage(maxPages);
    }
  };

  const handleAdd = (item: T) => {
    onAdd(item);
  };

  const handleEdit = (item: T) => {
    onUpdate(item);
  };

  const handleDelete = (item: T) => {
    onDelete(item);
  };

  const handleExportToPDF = () => {
    if (items.length) {
    const headers = columns.map((col) => col.title);
    const data = items.map((item) => {
      const docDataItem: any[] = [];

      columns.forEach((col) => {
        docDataItem.push(item[col.key as keyof T]);
      });

      return docDataItem;
    });

    const docDefinition = {
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
            widths: ['*', '*', '*', '*'],
            body: [headers, ...data],
          },
        },
      ],
    };

    pdfMake.createPdf(docDefinition).download(`${fileName}.pdf`);
    } else {
      notification.error(
        <ErrorDescription>{messages.NO_DATA}</ErrorDescription>,
        {
          direction: 'vertical',
          title: 'Ошибка операции'
        }
      );
    }
  };

  const handleExportToExcel = () => {
    if (items.length) {
      const worksheetData = items.map((item) => {
        const worksheetDataItem: any[] = [];

        columns.forEach((col) => {
          worksheetDataItem.push(item[col.key as keyof T]);
        });

        return worksheetDataItem;
      });
      const worksheet = XLSXUtils.aoa_to_sheet([[...columns.map((col) => col.title)], ...worksheetData]);
      const workbook = XLSXUtils.book_new();
      XLSXUtils.book_append_sheet(workbook, worksheet, fileName);
      XLSXWriteFile(workbook, `${fileName}.xlsx`);
    } else {
      notification.error(
        <ErrorDescription>{messages.NO_DATA}</ErrorDescription>,
        {
          direction: 'vertical',
          title: 'Ошибка операции'
        }
      );
    }
  };

  const enchancedColumns = useMemo(() => {
    const hasEdit = editable && editable.indexOf('e') > -1;
    const hasDelete = editable && editable.indexOf('d') > -1;

    if (hasEdit || hasDelete) {
      return columns.concat([
        {
          key: 'actions',
          dataIndex: 'actions',
          width: 60,
          renderCellContent: ({ row }) => {
            const editButton = (ModalComponent != null && hasEdit ? (
              <ButtonModalBundle
                ModalComponent={ModalComponent}
                buttonContent={<Edit width={ICON_SIZE} height={ICON_SIZE} />}
                onAccept={handleEdit}
                buttonProps={{
                  kind: 'outlined',
                  color: 'secondary',
                  size: 'sm',
                  className: classes.iconButton
                }}
                options={{ item: row }}
              />
            ) : null);
  
            const deleteButton = (hasDelete ? (
              <Button onClick={() => { handleDelete(row) }} className={classes.iconButton} kind="outlined" size="sm" color="secondary">
                <Trash width={ICON_SIZE} height={ICON_SIZE} />
              </Button>
            ) : null);
  
            if (hasEdit || hasDelete) {
              return (
                <Box className={classes.actionsRightSide}>
                  {editButton}
                  {deleteButton}
                </Box>
              );
            }
  
            return null;
          }
        }
      ]);
    }

    return columns;
  }, [columns, editable]);

  const filteredItems = useMemo(() => items.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  ), [filter, items]);

  const sortedItems = useMemo(() => {
    if (orderBy) {
      switch (sortOrder) {
        case 'asc': {
          return filteredItems.sort((a, b) => {
            if (a[orderBy] < b[orderBy]) {
              return -1
            }
  
            return a[orderBy] > b[orderBy] ? 1 : 0
          })
        }
        case 'desc': {
          return filteredItems.sort((a, b) => {
            if (a[orderBy] > b[orderBy]) {
              return -1
            }
  
            return a[orderBy] < b[orderBy] ? 1 : 0
          })
        }
        case 'none': {
          return filteredItems;
        }
      }
    }

    return filteredItems;
  }, [sortOrder, orderBy, filter, items]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;

    return sortedItems.slice(firstPageIndex, lastPageIndex)
  }, [sortOrder, orderBy, filter, currentPage, itemsPerPage, items]);

  const handleChangeTable = useCallback<(params: TableEventType<RecordDataSource<T>>) => void> ((params) => {
    switch (params.type) {
      case 'sort': {
        setOrderBy(params.dataIndex as keyof T);
        setSortOrder(params.sortOrder);
        break;
      }

      default: {
        throw new Error(`Invalid param "type=${params.type}"`);
      }
    }
  }, []);

  return (
    <Box className={classes.container}>
      <Box className={classes.actions}>
        <Input
          label="Фильтр"
          size="sm"
          value={filter}
          onChange={handleFilterChange}
          suffix={<Filter />}
        />
        <Box className={classes.actionsRightSide}>
          {ModalComponent != null && editable && editable.indexOf('c') > -1 ? (
            <ButtonModalBundle
              ModalComponent={ModalComponent}
              buttonContent='Добавить'
              onAccept={handleAdd}
              buttonProps={{
                kind: 'contained',
                color: 'primary',
                prefixIcon: <PlaylistAdd />
              }}
            />
          ) : null}
          {pdfExportable ? (
            <Button
              kind="outlined"
              color="primary"
              size="sm"
              prefixIcon={<Printer />}
              onClick={handleExportToPDF}
            >
              Экспорт в PDF
            </Button>
          ) : null}
          {excelExportable ? (
            <Button
              kind="outlined"
              color="primary"
              size="sm"
              prefixIcon={<TableExport />}
              onClick={handleExportToExcel}
            >
              Экспорт в Excel
            </Button>
          ) : null}
        </Box>
      </Box>
      <Table
        size="sm"
        columns={enchancedColumns}
        classes={{
          headCell: classes.tableHeader
        }}
        dataSource={currentTableData}
        onChange={handleChangeTable}
      />
      {Math.floor(filteredItems.length / itemsPerPage) ? 
        <TablePagination
          size="sm"
          currentPage={currentPage}
          pageSize={itemsPerPage}
          totalCount={sortedItems.length}
          onChange={setCurrentPage}
          onPageSizeChange={setItemsPerPage}
          pageSizesArray={[5, 10, 15]}
          paginationType={TablePaginationType.advanced}
          itemsPerPageText="Элементов на странице"
          classes={{
            dividerTop: classes.paginationDivider
          }}
        /> : null
      }
    </Box>
  );
};