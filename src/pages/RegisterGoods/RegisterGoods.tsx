import { useGetGoodsQuery, useAddGoodMutation, useUpdateGoodMutation, useDeleteGoodMutation } from '@api/goods/goodsApi';
import { Good } from '../../models/goods';
import { CircularProgress, Container, createUseStyles, notification, Text } from '@v-uik/base';
import { PageFallback } from '@shared/common/molecules';
import { FAILED_TO_LOAD_MESSAGE, MESSAGES } from '@/features/goods/constants';
import { AppTable } from '@shared/common/organisms';
import { GoodModal, getColumns } from '@/features/goods/components';
import { ErrorDescription } from '@shared/common/atoms';
import { isErrorResponse } from '@shared/common/utils';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(10)
  }
}));

export const RegisterGoods = () => {
  const { data, isLoading, isUninitialized, isError, refetch } = useGetGoodsQuery();
  const classes = useStyles();
  const [addGood] = useAddGoodMutation();
  const [updateGood] = useUpdateGoodMutation();
  const [deleteGood] = useDeleteGoodMutation();

  const handleAddGood = (good: Good) => {
    addGood(good)
      .unwrap()
      .then(() => {
        notification.success(
          <ErrorDescription>{MESSAGES.ADDED}</ErrorDescription>,
          {
            direction: 'vertical',
            title: 'Операция успешна'
          }
        );
      })
      .catch((error) => {
        if (import.meta.env.VITE_NEEDS_MIRAGE) {
          console.log(error.error);
        }

        if (isErrorResponse(error)) {
          notification.error(
            <ErrorDescription>{error.data.message}</ErrorDescription>,
            {
              direction: 'vertical',
              title: 'Ошибка операции'
            }
          )
        }
      });
  };

  const handleUpdateGood = (good: Good) => {
    updateGood(good)
      .unwrap()
      .then(() => {
        notification.success(
          <ErrorDescription>{MESSAGES.UPDATED}</ErrorDescription>,
          {
            direction: 'vertical',
            title: 'Операция успешна'
          }
        );
      })
      .catch((error) => {
        if (import.meta.env.VITE_NEEDS_MIRAGE) {
          console.log(error.error);
        }

        if (isErrorResponse(error)) {
          notification.error(
            <ErrorDescription>{error.data.message}</ErrorDescription>,
            {
              direction: 'vertical',
              title: 'Ошибка операции'
            }
          )
        }
      });
  };

  const handleDeleteGood = (good: Good) => {
    deleteGood({ id: good.id })
      .unwrap()
      .then(() => {
        notification.success(
          <ErrorDescription>{MESSAGES.DELETED}</ErrorDescription>,
          {
            direction: 'vertical',
            title: 'Операция успешна'
          }
        );
      })
      .catch((error) => {
        if (import.meta.env.VITE_NEEDS_MIRAGE) {
          console.log(error.error);
        }

        if (isErrorResponse(error)) {
          notification.error(
            <ErrorDescription>{error.data.message}</ErrorDescription>,
            {
              direction: 'vertical',
              title: 'Ошибка операции'
            }
          )
        }
      });
  };

  const getPageCommon = () => {
    return (
      <Text kind="h4" gutterBottom>
        Регистрировать ТМЦ
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
  } else if (isError || data?.data == null) {
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
        items={data.data}
        columns={getColumns()}
        fileName="Goods"
        ModalComponent={GoodModal}
        onAdd={handleAddGood}
        onDelete={handleDeleteGood}
        onUpdate={handleUpdateGood}
        messages={MESSAGES}
        pdfExportable
        excelExportable
        editable="ced"
      />
    </>
  );
};
