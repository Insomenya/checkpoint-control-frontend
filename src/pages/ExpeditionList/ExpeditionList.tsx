import { useGetAllExpeditionsQuery } from '@/api/expeditions/expeditionsApi';
import { CircularProgress, Container, createUseStyles, Text } from '@v-uik/base';
import { PageFallback } from '@shared/common/molecules';
import { FAILED_TO_LOAD_MESSAGE } from '@/features/expeditionList/constants';
import { ExpeditionTable } from '@/features/expeditionList/components';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(10)
  }
}));

export const ExpeditionList = () => {
  const { data, isLoading, isUninitialized, isError, refetch } = useGetAllExpeditionsQuery();
  const classes = useStyles();

  const getPageCommon = () => {
    return (
      <Text kind="h4" gutterBottom>
        Список экспедиций
      </Text>
    );
  };

  if (isLoading || isUninitialized) {
    return (
      <>
        {getPageCommon()}
        <Container className={classes.container}>
          <CircularProgress />
        </Container>
      </>
    );
  } else if (isError || !data) {
    return (
      <>
        {getPageCommon()}
        <PageFallback message={FAILED_TO_LOAD_MESSAGE} refetch={refetch} />
      </>
    );
  }

  return (
    <>
      {getPageCommon()}
      <ExpeditionTable 
        expeditions={data} 
        isLoading={isLoading} 
      />
    </>
  );
}; 