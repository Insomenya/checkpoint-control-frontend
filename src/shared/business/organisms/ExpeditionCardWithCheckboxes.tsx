import { Box, Checkbox, createUseStyles, Text } from '@v-uik/base';
import { ExpeditionCardBase, ExpeditionCardBaseProps } from './ExpeditionCardBase';
import { ExpeditionStatusResponseDTO } from '@/models/expeditions';

const useStyles = createUseStyles((theme) => ({
  headerWithCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2)
  }
}));

type Props = {
  expedition: ExpeditionStatusResponseDTO | null;
  onInvoiceCheckChange: (invoiceId: number, checked: boolean) => void;
  checkedInvoices: number[];
};

export const ExpeditionCardWithCheckboxes = ({ 
  expedition, 
  onInvoiceCheckChange,
  checkedInvoices
}: Props) => {
  const classes = useStyles();

  const handleCheckboxChange = (invoiceId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onInvoiceCheckChange(invoiceId, e.target.checked);
  };

  const renderInvoiceHeader = ({ invoiceId, invoiceNumber }: Parameters<NonNullable<ExpeditionCardBaseProps['renderInvoiceHeader']>>[0]) => {
    const isChecked = checkedInvoices.includes(invoiceId);
    
    return (
      <Box className={classes.headerWithCheckbox}>
        <Checkbox 
          checked={isChecked}
          onChange={handleCheckboxChange(invoiceId)}
          onClick={(e) => {
            // Prevent accordion toggle when clicking checkbox
            e.stopPropagation();
          }}
        />
        <Text>Накладная №{invoiceNumber}</Text>
      </Box>
    );
  };

  return (
    <ExpeditionCardBase 
      expedition={expedition}
      renderInvoiceHeader={renderInvoiceHeader}
    />
  );
}; 