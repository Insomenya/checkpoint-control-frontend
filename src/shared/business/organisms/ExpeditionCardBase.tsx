import { useState, ReactNode } from 'react';
import { Accordion, AccordionItem, Box, Card, createUseStyles, Divider, Text } from '@v-uik/base';
import { ObjectSummary } from '@shared/common/molecules';
import { ExpeditionStatusResponseDTO } from '@/models/expeditions';
import { AppTable } from '@shared/common/organisms';
import { getInvoiceGoodsColumns, GoodItemType } from '@shared/business/utils';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4)
  },
  summarySection: {
    marginBottom: theme.spacing(4)
  },
  emptyState: {
    padding: theme.spacing(4),
    textAlign: 'center'
  }
}));

export type InvoiceItemProps = {
  invoiceId: number;
  invoiceNumber: string;
  expanded: boolean;
  onClick: () => void;
  customHeader?: ReactNode;
};

export type ExpeditionCardBaseProps = {
  expedition: ExpeditionStatusResponseDTO | null;
  renderInvoiceHeader?: (props: InvoiceItemProps) => ReactNode;
};

export const ExpeditionCardBase = ({ 
  expedition,
  renderInvoiceHeader
}: ExpeditionCardBaseProps) => {
  const classes = useStyles();
  const [expandedInvoiceId, setExpandedInvoiceId] = useState<number | null>(null);

  const handleAccordionClick = (invoiceId: number) => () => {
    setExpandedInvoiceId(expandedInvoiceId === invoiceId ? null : invoiceId);
  };

  if (!expedition) {
    return null;
  }

  const expeditionSummaryItems = [
    { label: 'Название', text: expedition.name },
    { label: 'Направление', text: expedition.direction_display },
    { label: 'Тип', text: expedition.type_display },
    { label: 'Отправитель', text: expedition.sender_name },
    { label: 'Получатель', text: expedition.receiver_name },
  ];

  const transportSummaryItems = [
    { label: 'ФИО', text: expedition.full_name },
    { label: 'Телефон', text: expedition.phone_number },
    { label: 'Номер паспорта', text: expedition.passport_number },
    { label: 'Номер ТС', text: expedition.license_plate },
    { label: 'Модель ТС', text: expedition.vehicle_model },
  ];

  const hasInvoices = expedition.invoices && expedition.invoices.length > 0;

  return (
    <Card>
      <Box className={classes.container}>
        <Text kind="h6">Информация об экспедиции</Text>
        
        <Box className={classes.summarySection}>
          <Text kind="subtitle1" gutterBottom>Общие данные:</Text>
          <ObjectSummary summaryItems={expeditionSummaryItems} />
        </Box>
        
        <Box className={classes.summarySection}>
          <Text kind="subtitle1" gutterBottom>Данные ответственного лица/транспорта:</Text>
          <ObjectSummary summaryItems={transportSummaryItems} />
        </Box>
        
        <Divider />
        
        <Text kind="subtitle1">Накладные:</Text>
        
        {!hasInvoices ? (
          <Box className={classes.emptyState}>
            <Text>Нет накладных</Text>
          </Box>
        ) : (
          <Accordion>
            {expedition.invoices.map((invoice) => {
              const goodsItems: GoodItemType[] = invoice.invoice_goods.map(ig => ({
                id: ig.good.id,
                name: ig.good.name,
                description: ig.good.description,
                unit_of_measurement_display: ig.good.unit_of_measurement_display,
                quantity: ig.quantity
              }));
              
              const isExpanded = expandedInvoiceId === invoice.id;
              const handleClick = handleAccordionClick(invoice.id);
              
              const defaultHeader = `Накладная №${invoice.number}`;
              const customHeader = renderInvoiceHeader ? 
                renderInvoiceHeader({
                  invoiceId: invoice.id,
                  invoiceNumber: invoice.number,
                  expanded: isExpanded,
                  onClick: handleClick
                }) : 
                undefined;
              
              return (
                <AccordionItem
                  key={invoice.id}
                  header={customHeader || defaultHeader}
                  expanded={isExpanded}
                  onClick={handleClick}
                >
                  <Box className={classes.summarySection}>
                    <Text kind="subtitle2" gutterBottom>Информация о накладной:</Text>
                    <ObjectSummary
                      summaryItems={[
                        { label: 'Номер накладной', text: invoice.number },
                        { label: 'Описание груза', text: invoice.cargo_description },
                      ]}
                    />
                  </Box>
                  
                  <Text kind="subtitle2" gutterBottom>Товары:</Text>
                  <AppTable
                    fileName={`Товары_накладной_${invoice.number}`}
                    columns={getInvoiceGoodsColumns()}
                    items={goodsItems}
                    hideDefaultFilter
                  />
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </Box>
    </Card>
  );
}; 