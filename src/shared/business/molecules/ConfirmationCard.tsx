import { Box, Card, clsx, createUseStyles, Divider, Text, Underlay } from '@v-uik/base';
import { ObjectSummary } from '@shared/common/molecules';
import { ConfirmationItem } from '@/models/expeditions';
import { CircularProgressCentered } from '@shared/common/atoms';
import { AlertCircle } from '@v-uik/icons';

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
  statusCancelled: {
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
  },
  infoIcon: {
    marginBottom: theme.spacing(2),
    color: theme.ref.palette.blue50
  },
  pendingState: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.ref.palette.blue90,
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  pendingText: {
    fontSize: '0.9rem',
    textAlign: 'center'
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
      case 'cancelled':
        return classes.statusCancelled;
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
          <Box className={classes.container}>
            <Divider />
            <Box className={classes.pendingState}>
              <AlertCircle className={classes.infoIcon} />
              <Text kind="subtitle2">Ожидает подтверждения</Text>
              <Text className={classes.pendingText} gutterBottom>
                Экспедиция еще не была подтверждена или отклонена оператором КПП
              </Text>
            </Box>
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