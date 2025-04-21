import { useGetGoodsQuery, useCreateGoodMutation, useUpdateGoodMutation, useDeleteGoodMutation } from '@api/goods/goodsApi';
import { Good, GoodIdParam } from '../../models/goods';
import { CircularProgress, Container, createUseStyles, notification, Text } from '@v-uik/base';
import { PageFallback } from '@shared/common/molecules';
import { FAILED_TO_LOAD_MESSAGE, MESSAGES, GOODS_CUSTOM_FILTERS } from '@/features/goods/constants';
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
  const [createGood] = useCreateGoodMutation();
  const [updateGood] = useUpdateGoodMutation();
  const [deleteGood] = useDeleteGoodMutation();

  const handleAddGood = (good: Good) => {
    createGood(good)
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
                <ErrorDescription>
                    {error?.data.detail || 'Произошла ошибка при выполнении операции'}
                </ErrorDescription>,
                { title: 'Ошибка операции', direction: 'vertical' }
            );
        } else {
            notification.error(
                <ErrorDescription>
                    {error instanceof Error ? error.message : 'Произошла ошибка при выполнении операции'}
                </ErrorDescription>,
                { title: 'Ошибка операции', direction: 'vertical' }
            );
        }
      });
  };

  const handleUpdateGood = (good: Good) => {
    if (typeof good.id === 'number') {
      const { id, ...updateData } = good;
      updateGood({ id, ...updateData })
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
                <ErrorDescription>
                    {error?.data.detail || 'Произошла ошибка при выполнении операции'}
                </ErrorDescription>,
                { title: 'Ошибка операции', direction: 'vertical' }
            );
          } else {
              notification.error(
                  <ErrorDescription>
                      {error instanceof Error ? error.message : 'Произошла ошибка при выполнении операции'}
                  </ErrorDescription>,
                  { title: 'Ошибка операции', direction: 'vertical' }
              );
          }
        });
    }
  };

  const handleDeleteGood = (good: Good) => {
    if (typeof good.id === 'number') {
      const idParam: GoodIdParam = { id: good.id };
      deleteGood(idParam)
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
                <ErrorDescription>
                    {error?.data.detail || 'Произошла ошибка при выполнении операции'}
                </ErrorDescription>,
                { title: 'Ошибка операции', direction: 'vertical' }
            );
          } else {
              notification.error(
                  <ErrorDescription>
                      {error instanceof Error ? error.message : 'Произошла ошибка при выполнении операции'}
                  </ErrorDescription>,
                  { title: 'Ошибка операции', direction: 'vertical' }
              );
          }
        });
    }
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
      <AppTable<Good>
        items={data}
        columns={getColumns()}
        fileName="Список ТМЦ"
        ModalComponent={GoodModal}
        onAdd={handleAddGood}
        onDelete={handleDeleteGood}
        onUpdate={handleUpdateGood}
        messages={MESSAGES}
        pdfExportable
        excelExportable
        editable="ced"
        customFilters={GOODS_CUSTOM_FILTERS}
      />
    </>
  );
};
