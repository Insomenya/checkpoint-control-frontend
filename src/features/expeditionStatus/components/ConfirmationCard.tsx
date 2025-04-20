import { Badge, Box, Card, clsx, createUseStyles, Text, Underlay } from '@v-uik/base';
import { ObjectSummary } from '@shared/common/molecules';
import { ConfirmationItem } from '@/models/expeditions';
import { CircularProgressCentered } from '@shared/common/atoms';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4)
  },
  statusIndicator: {
    display: 'inline-block',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  statusConfirmed: {
    backgroundColor: theme.ref.palette.green90,
    color: theme.ref.palette.green50
  },
  statusRejected: {
    backgroundColor: theme.ref.palette.red90,
    color: theme.ref.palette.red50
  },
  statusPending: {
    backgroundColor: theme.ref.palette.orange90,
    color: theme.ref.palette.orange50
  },
  emptyState: {
    padding: theme.spacing(4),
    textAlign: 'center'
  },
  summaryVertical: {
    flexDirection: 'column'
  }
}));

type Props = {
  confirmation: ConfirmationItem | null;
  isLoading?: boolean;
};

export const ConfirmationCard = ({ confirmation, isLoading }: Props) => {
  const classes = useStyles();

  const getStatusClass = (status?: string) => {
    if (!status) return classes.statusPending;
    
    switch (status.toLowerCase()) {
      case 'confirmed':
        return classes.statusConfirmed;
      case 'rejected':
        return classes.statusRejected;
      default:
        return classes.statusPending;
    }
  };

  return (
    <Card>
      <Box className={classes.container}>
        <Text kind="h6">Последнее подтверждение</Text>
        
        {isLoading ? (
          <Box className={classes.emptyState}>
            <CircularProgressCentered />
          </Box>
        ) : !confirmation ? (
          <Box className={classes.emptyState}>
            <Text>Нет данных о подтверждении</Text>
          </Box>
        ) : (
          <>
            <Underlay className={clsx(classes.statusIndicator, getStatusClass(confirmation.status))}>
             {confirmation.status_display}
            </Underlay>
            
            <ObjectSummary
              summaryItems={[
                { label: 'КПП/Зона', text: confirmation.zone_name },
                { label: 'Подтверждено', text: confirmation.confirmed_by_username },
                { label: 'Дата подтверждения', text: new Date(confirmation.confirmed_at).toLocaleString() }
              ]}
              className={classes.summaryVertical}
            />
          </>
        )}
      </Box>
    </Card>
  );
}; 