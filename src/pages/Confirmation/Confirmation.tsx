import { useState, useEffect } from 'react';
import { Box, Button, Card, CircularProgress, Container, createUseStyles, notification, Text } from '@v-uik/base';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@store/store';
import { selectUser } from '@store/auth/auth.selectors';
import { useGetExpeditionStatusQuery } from '@api/expeditions/expeditionsApi';
import { useCreateConfirmationMutation } from '@api/confirmations/confirmationsApi';
import { ROUTER_PATHS } from '@shared/common/constants';
import { ExpeditionCardWithCheckboxes } from '@shared/business/organisms';
import { ExpeditionList, ConfirmationCard } from '@shared/business/molecules';
import { PageFallback } from '@shared/common/molecules';
import { ErrorDescription } from '@shared/common/atoms';
import { isErrorResponse } from '@shared/common/utils';
import { CONFIRMATION_STATUS, MESSAGES } from '@/features/confirmExpedition/constants';
import { DIRECTION_OPTIONS } from '@/features/expeditionStatus/constants';
import { Check, X } from '@v-uik/icons';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4)
  },
  rowContainer: {
    display: 'flex',
    gap: theme.spacing(4),
    marginTop: theme.spacing(4)
  },
  expeditionColumn: {
    flex: '1 1 70%'
  },
  confirmationColumn: {
    flex: '1 1 30%'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(10)
  },
  actionsContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    maxWidth: 250,
    gap: theme.spacing(2)
  }
}));

export const Confirmation = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { expeditionId: expeditionIdParam } = useParams<{ expeditionId: string }>();
  const user = useAppSelector(selectUser);
  const checkpointId = user?.checkpoint?.id;
  
  const [expeditionId, setExpeditionId] = useState<number | null>(
    expeditionIdParam ? Number(expeditionIdParam) : null
  );
  const [checkedInvoices, setCheckedInvoices] = useState<number[]>([]);
  
  const { 
    data: expeditionStatus, 
    isLoading, 
    isError, 
    refetch 
  } = useGetExpeditionStatusQuery(Number(expeditionId) || 0, {
    skip: !expeditionId,
  });

  const [createConfirmation, { isLoading: isConfirming }] = useCreateConfirmationMutation();

  useEffect(() => {
    if (expeditionIdParam) {
      setExpeditionId(Number(expeditionIdParam));
    }
  }, [expeditionIdParam]);

  useEffect(() => {
    setCheckedInvoices([]);
  }, [expeditionId]);

  const handleExpeditionSelect = (id: number) => {
    setExpeditionId(id);
  };

  const handleClearSelection = () => {
    setExpeditionId(null);
    if (expeditionIdParam) {
      navigate(`/${ROUTER_PATHS.CONFIRMATION}`);
    }
  };

  const handleInvoiceCheck = (invoiceId: number, checked: boolean) => {
    if (checked) {
      setCheckedInvoices(prev => [...prev, invoiceId]);
    } else {
      setCheckedInvoices(prev => prev.filter(id => id !== invoiceId));
    }
  };

  const handleConfirm = async () => {
    if (!expeditionStatus || !checkpointId) return;
    
    const allInvoices = expeditionStatus.invoices.map(invoice => invoice.id);
    const allChecked = allInvoices.every(id => checkedInvoices.includes(id));
    
    if (!allChecked) {
      notification.warning(
        <ErrorDescription>{MESSAGES.NOT_ALL_INVOICES_CHECKED}</ErrorDescription>,
        {
          direction: 'vertical',
          title: 'Предупреждение'
        }
      );
      return;
    }
    
    try {
      await createConfirmation({
        expedition_id: expeditionStatus.id,
        checkpoint_id: checkpointId,
        status: CONFIRMATION_STATUS.CONFIRMED
      }).unwrap();
      
      notification.success(
        <ErrorDescription>{MESSAGES.CONFIRM_SUCCESS}</ErrorDescription>,
        {
          direction: 'vertical',
          title: 'Успешно'
        }
      );
      
      navigate(`/${ROUTER_PATHS.REPORTS.ROOT}${ROUTER_PATHS.REPORTS.SINGLE}/${expeditionStatus.id}`);
    } catch (error) {
      if (isErrorResponse(error)) {
        notification.error(
          <ErrorDescription>{error.data.message}</ErrorDescription>,
          {
            direction: 'vertical',
            title: 'Ошибка'
          }
        );
      } else {
        notification.error(
          <ErrorDescription>{MESSAGES.CONFIRM_ERROR}</ErrorDescription>,
          {
            direction: 'vertical',
            title: 'Ошибка'
          }
        );
      }
    }
  };

  const handleReject = async () => {
    if (!expeditionStatus || !checkpointId) return;
    
    try {
      await createConfirmation({
        expedition_id: expeditionStatus.id,
        checkpoint_id: checkpointId,
        status: CONFIRMATION_STATUS.CANCELLED
      }).unwrap();
      
      notification.success(
        <ErrorDescription>{MESSAGES.REJECT_SUCCESS}</ErrorDescription>,
        {
          direction: 'vertical',
          title: 'Успешно'
        }
      );
      
      navigate(`/${ROUTER_PATHS.REPORTS.ROOT}${ROUTER_PATHS.REPORTS.SINGLE}/${expeditionStatus.id}`);
    } catch (error) {
      if (isErrorResponse(error)) {
        notification.error(
          <ErrorDescription>{error.data.message}</ErrorDescription>,
          {
            direction: 'vertical',
            title: 'Ошибка'
          }
        );
      } else {
        notification.error(
          <ErrorDescription>{MESSAGES.CONFIRM_ERROR}</ErrorDescription>,
          {
            direction: 'vertical',
            title: 'Ошибка'
          }
        );
      }
    }
  };

  if (!checkpointId) {
    return (
      <Box className={classes.container}>
        <Text kind="h4" gutterBottom>
          Подтверждение экспедиции
        </Text>
        <Card>
          <Text color="error">{MESSAGES.OPERATOR_NO_CHECKPOINT}</Text>
        </Card>
      </Box>
    );
  }

  const allInvoicesChecked = expeditionStatus?.invoices.length === checkedInvoices.length && expeditionStatus?.invoices.length > 0;

  return (
    <Box className={classes.container}>
      <Text kind="h4" gutterBottom>
        Подтверждение экспедиции
      </Text>
      
      {!expeditionId ? (
        <ExpeditionList
          checkpointId={checkpointId}
          onSelect={handleExpeditionSelect}
          selectedExpeditionId={expeditionId}
          onClearSelection={handleClearSelection}
          directionOptions={DIRECTION_OPTIONS}
          title="Экспедиции для подтверждения"
          loadingMessage="Загрузка списка экспедиций..."
          errorMessage={MESSAGES.FAILED_TO_LOAD}
          emptyMessage="Нет экспедиций, ожидающих подтверждения"
        />
      ) : isLoading ? (
        <Container className={classes.loadingContainer}>
          <CircularProgress />
        </Container>
      ) : isError ? (
        <PageFallback message={MESSAGES.FAILED_TO_LOAD} refetch={refetch} />
      ) : !expeditionStatus ? (
        <PageFallback message={MESSAGES.EXPEDITION_NOT_FOUND} refetch={refetch} />
      ) : (
        <>
          <ExpeditionList
            checkpointId={checkpointId}
            onSelect={handleExpeditionSelect}
            selectedExpeditionId={expeditionId}
            onClearSelection={handleClearSelection}
            directionOptions={DIRECTION_OPTIONS}
          />
          <Box className={classes.rowContainer}>
            <Box className={classes.expeditionColumn}>
              <ExpeditionCardWithCheckboxes 
                expedition={expeditionStatus}
                onInvoiceCheckChange={handleInvoiceCheck}
                checkedInvoices={checkedInvoices}
              />
            </Box>
            <Box className={classes.confirmationColumn}>
              <ConfirmationCard 
                confirmation={expeditionStatus?.last_confirmation || null} 
                isLoading={isLoading}
              />
              
              <Box className={classes.actionsContainer}>
                <Button 
                  kind="outlined" 
                  color="error"
                  prefixIcon={<X />}
                  onClick={handleReject}
                  disabled={isConfirming}
                >
                  Отклонить
                </Button>
                <Button 
                  kind="contained"
                  color="primary"
                  prefixIcon={<Check />}
                  onClick={handleConfirm}
                  disabled={!allInvoicesChecked || isConfirming}
                >
                  Подтвердить
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
