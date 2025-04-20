import { Accordion, AccordionItem, Box, Text, createUseStyles } from '@v-uik/base';
import { GoodWithDisplayUnit } from '@/models/goods';
import { GoodsList } from './GoodsList';

type NewInvoice = {
    id?: number;
    number?: string;
    cargo_description?: string;
    goods: Array<{ good_id: number; quantity: number }>;
};

const useStyles = createUseStyles((theme) => ({
    invoicesList: {
        marginTop: theme.spacing(2)
    },
    emptyState: {
        padding: theme.spacing(4),
        textAlign: 'center'
    }
}));

type InvoiceAccordionProps = {
    invoices: NewInvoice[];
    expandedInvoiceId: number | null;
    goods: GoodWithDisplayUnit[];
    onAccordionClick: (invoiceId: number) => () => void;
    onOpenAddGoodModal: (invoiceId: number) => void;
    onDeleteGood: (invoiceId: number, goodId: number) => void;
};

export const InvoiceAccordion = ({
    invoices,
    expandedInvoiceId,
    goods,
    onAccordionClick,
    onOpenAddGoodModal,
    onDeleteGood
}: InvoiceAccordionProps) => {
    const classes = useStyles();

    if (invoices.length === 0) {
        return (
            <Box className={classes.emptyState}>
                <Text>Нет накладных. Добавьте хотя бы одну накладную.</Text>
            </Box>
        );
    }

    return (
        <Accordion>
            {invoices.map((invoice) => {
                if (invoice.id === undefined) return null;
                
                return (
                    <AccordionItem
                        key={invoice.id}
                        header={`Накладная: ${invoice.number}`}
                        expanded={expandedInvoiceId === invoice.id}
                        onClick={onAccordionClick(invoice.id)}
                    >
                        <GoodsList 
                            invoiceId={invoice.id}
                            invoiceGoods={invoice.goods}
                            goods={goods}
                            onOpenAddGoodModal={onOpenAddGoodModal}
                            onDeleteGood={onDeleteGood}
                        />
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}; 