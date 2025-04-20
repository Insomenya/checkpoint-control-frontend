import { useState, useEffect } from 'react';
import { Box, CircularProgress, Container, createUseStyles, Text } from '@v-uik/base';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@store/store';
import { selectUser } from '@store/auth/auth.selectors';
import { useGetExpeditionStatusQuery } from '@api/expeditions/expeditionsApi';
import { LogistSearchForm, ExpeditionStatusReport } from '@/features/expeditionStatus/components';
import { MESSAGES, DIRECTION_OPTIONS } from '@/features/expeditionStatus/constants';
import { PageFallback } from '@shared/common/molecules';
import { ExpeditionList, ConfirmationCard } from '@shared/business/molecules';
import { ExpeditionCardSimple } from '@shared/business/organisms';

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
    flex: '1 1 30%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2)
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(10)
  }
}));

export const ExpeditionStatus = () => {
  const classes = useStyles();
  const user = useAppSelector(selectUser);
  const userRole = user?.role;
  const checkpointId = user?.checkpoint?.id;
  
  const { expeditionId: expeditionIdParam } = useParams<{ expeditionId: string }>();
  const [expeditionId, setExpeditionId] = useState<number | null>(
    expeditionIdParam ? Number(expeditionIdParam) : null
  );
  
  const { 
    data: expeditionStatus, 
    isLoading, 
    isError, 
    refetch 
  } = useGetExpeditionStatusQuery(expeditionId || 0, {
    skip: !expeditionId,
  });

  useEffect(() => {
    if (expeditionIdParam) {
      setExpeditionId(Number(expeditionIdParam));
    }
  }, [expeditionIdParam]);

  const handleExpeditionSearch = (id: number) => {
    setExpeditionId(id);
  };
  
  const handleClearSelection = () => {
    setExpeditionId(null);
  };

  const renderOperatorView = () => {
    if (!checkpointId) {
      return <Text color="error">Оператор не привязан к КПП</Text>;
    }
    
    return (
      <>
        <ExpeditionList 
          checkpointId={checkpointId}
          onSelect={handleExpeditionSearch}
          selectedExpeditionId={expeditionId}
          onClearSelection={handleClearSelection}
          directionOptions={DIRECTION_OPTIONS}
          title="Экспедиции для просмотра"
        />
        
        {expeditionId && (
          <Box className={classes.rowContainer}>
            <Box className={classes.expeditionColumn}>
              {isLoading ? (
                <Container className={classes.loadingContainer}>
                  <CircularProgress />
                </Container>
              ) : isError ? (
                <PageFallback message={MESSAGES.FAILED_TO_LOAD} refetch={refetch} />
              ) : !expeditionStatus ? (
                <PageFallback message={MESSAGES.EXPEDITION_NOT_FOUND} refetch={refetch} />
              ) : (
                <ExpeditionCardSimple expedition={expeditionStatus} />
              )}
            </Box>
            <Box className={classes.confirmationColumn}>
              <ConfirmationCard 
                confirmation={expeditionStatus?.last_confirmation || null} 
                isLoading={isLoading}
              />
              {expeditionStatus && (
                <ExpeditionStatusReport 
                  expedition={expeditionStatus} 
                  confirmation={expeditionStatus.last_confirmation} 
                />
              )}
            </Box>
          </Box>
        )}
      </>
    );
  };

  const renderLogistView = () => {
    return (
      <>
        <LogistSearchForm onSearch={handleExpeditionSearch} />
        
        {expeditionId && (
          <Box className={classes.rowContainer}>
            <Box className={classes.expeditionColumn}>
              {isLoading ? (
                <Container className={classes.loadingContainer}>
                  <CircularProgress />
                </Container>
              ) : isError ? (
                <PageFallback message={MESSAGES.FAILED_TO_LOAD} refetch={refetch} />
              ) : !expeditionStatus ? (
                <PageFallback message={MESSAGES.EXPEDITION_NOT_FOUND} refetch={refetch} />
              ) : (
                <ExpeditionCardSimple expedition={expeditionStatus} />
              )}
            </Box>
            <Box className={classes.confirmationColumn}>
              <ConfirmationCard 
                confirmation={expeditionStatus?.last_confirmation || null} 
                isLoading={isLoading}
              />
              {expeditionStatus && (
                <ExpeditionStatusReport 
                  expedition={expeditionStatus} 
                  confirmation={expeditionStatus.last_confirmation} 
                />
              )}
            </Box>
          </Box>
        )}
      </>
    );
  };

  return (
    <Box className={classes.container}>
      <Text kind="h4" gutterBottom>
        Данные экспедиции
      </Text>
      
      {userRole === 'operator' 
        ? renderOperatorView() 
        : renderLogistView()}
    </Box>
  );
};
