import { FC, useCallback, useMemo, useState } from 'react';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.vfs;
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import { Box, Button, ColumnProps, createUseStyles, Input, notification, RecordDataSource, SortOrderProp, Table, TableEventType, TablePagination, TablePaginationType } from '@v-uik/base';
import { ErrorDescription } from '../atoms';
import { ICON_SIZE, Messages, MESSAGES } from '@shared/constants';
import { ButtonModalBundle, ModalProps } from './ButtonModalBundle';
import { Edit, Filter, PlaylistAdd, Printer, TableExport, Trash } from '@v-uik/icons';

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

type GoodsTableProps<T extends object> = {
    messages?: Messages;
    fileName: string;
    columns: ColumnProps<T>[];
    items: T[];
    ModalComponent: FC<ModalProps<T, ModalOptions<T>>>;
    onAdd: (item: T) => void;
    onDelete: (item: T) => void;
    onUpdate: (item: T) => void;
}

export const AppTable = <T extends object> ({ messages = MESSAGES, fileName, columns, items, ModalComponent, onAdd, onDelete, onUpdate }: GoodsTableProps<T>) => {
  const classes = useStyles();
  const [orderBy, setOrderBy] = useState<keyof T | undefined>();
  const [sortOrder, setSortOrder] = useState<SortOrderProp>('none')
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleOpenModal = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAdd = (item: T) => {
    onAdd(item);
    notification.success(
      <ErrorDescription>{messages.ADDED}</ErrorDescription>,
      {
        direction: 'vertical',
        title: 'Операция успешна'
      }
    );
  };

  const handleEdit = (item: T) => {
    onUpdate(item);
    notification.success(
      <ErrorDescription>{messages.UPDATED}</ErrorDescription>,
      {
        direction: 'vertical',
        title: 'Операция успешна'
      }
    );
  };

  const handleDelete = (item: T) => {
    onDelete(item);
    notification.success(
      <ErrorDescription>{messages.DELETED}</ErrorDescription>,
      {
        direction: 'vertical',
        title: 'Операция успешна'
      }
    );
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
  }, [sortOrder, orderBy, filteredItems]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;

    return sortedItems.slice(firstPageIndex, lastPageIndex)
  }, [sortedItems, currentPage, itemsPerPage]);

  const handleChangeTable = useCallback<
    (params: TableEventType<RecordDataSource<T>>) => void
  >((params) => {
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

  // todo сделать добавление
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
          <ButtonModalBundle
            ModalComponent={ModalComponent}
            labelShowButton='Добавить'
            buttonProps={{
              kind: "contained",
              color: "primary",
              prefixIcon: <PlaylistAdd />
            }}
            options={{ item: editing }}
          />
          <Button
            kind="outlined"
            color="primary"
            size="sm"
            prefixIcon={<Printer />}
            onClick={handleExportToPDF}
          >
            Экспорт в PDF
          </Button>
          <Button
            kind="outlined"
            color="primary"
            size="sm"
            prefixIcon={<TableExport />}
            onClick={handleExportToExcel}
          >
            Экспорт в Excel
          </Button>
        </Box>
      </Box>
      <Table
        size="sm"
        columns={columns.concat([
          {
            key: 'actions',
            dataIndex: 'actions',
            width: 60,
            renderCellContent: ({ row }) => {
              // todo сделать редактирование
              return (
                <Box className={classes.actionsRightSide}>
                  <Button className={classes.iconButton} kind="outlined" size="sm" color="secondary"><Edit width={ICON_SIZE} height={ICON_SIZE} /></Button>
                  <Button onClick={() => { handleDelete(row) }} className={classes.iconButton} kind="outlined" size="sm" color="secondary"><Trash width={ICON_SIZE} height={ICON_SIZE} /></Button>
                </Box>
              );
            }
          }
        ])}
        classes={{
          headCell: classes.tableHeader
        }}
        dataSource={currentTableData}
        onChange={handleChangeTable}
      />
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
      />
    </Box>
  );
};