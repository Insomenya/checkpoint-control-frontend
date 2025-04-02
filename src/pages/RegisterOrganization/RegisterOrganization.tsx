import { useGetGoodsQuery, useAddGoodMutation, useUpdateGoodMutation, useDeleteGoodMutation } from '@api/goods/goodsApi';
import { Good } from '../../models/goods';
import { CircularProgress, Container, createUseStyles, Text } from '@v-uik/base';
import { PageFallback } from '@shared/common/molecules';
import { FAILED_TO_LOAD_MESSAGE } from '@/features/goods/constants';
import { AppTable } from '@shared/common/organisms';
import { getColumns } from '@/features/goods/components';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(10)
  }
}));

export const RegisterOrganization = () => {
  const { data, isLoading, isUninitialized, isError, refetch } = useGetGoodsQuery();
  const classes = useStyles();
  const [addGood] = useAddGoodMutation();
  const [updateGood] = useUpdateGoodMutation();
  const [deleteGood] = useDeleteGoodMutation();

  const handleAddGood = (good: Good) => {
    addGood(good);
  };

  const handleUpdateGood = (good: Good) => {
    updateGood(good);
  };

  const handleDeleteGood = (good: Good) => {
    deleteGood({ id: good.id });
  };

  const getPageCommon = () => {
    return (
      <Text kind="h4" gutterBottom>
        Регистрировать организации
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
  }

  if (isError) {
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
      <AppTable<Good>
        items={data.goods}
        columns={getColumns()}
        fileName="Goods"
        onAdd={handleAddGood}
        onDelete={handleDeleteGood}
        onUpdate={handleUpdateGood}
      />
    </>
  );
};
