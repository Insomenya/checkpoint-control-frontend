import { CircularProgress, Container, createUseStyles, notification, Text } from '@v-uik/base';
import { PageFallback } from '@shared/common/molecules';
import { AppTable } from '@shared/common/organisms';
import { ErrorDescription } from '@shared/common/atoms';
import { isErrorResponse } from '@shared/common/utils';
import { useGetCheckpointsQuery } from '@api/checkpoints/checkpointsApi';
import { FAILED_TO_LOAD_MESSAGE, MESSAGES } from '@/features/users/constants';
import { useDeleteUserMutation, useGetUsersQuery } from '@api/users/usersApi';
import { User } from '@/models/auth';
import { getColumns } from '@/features/users/components';
import { useMemo } from 'react';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(10)
  },
  textCell: {
    padding: [theme.spacing(3.5), theme.spacing(4)]
  },
  headerCell: {
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center'
  },
}));

export const Users = () => {
  const { data: checkpointsData, isSuccess: isCheckpointsLoaded } = useGetCheckpointsQuery();
  const { data: usersData, isLoading: isUsersLoading, isUninitialized: isUsersUninitialized, isError: usersHasErrorState, refetch: refetchUsers } = useGetUsersQuery();

  const classes = useStyles();
  const [deleteUser] = useDeleteUserMutation();

  const columns = useMemo(() => {
    return getColumns({
        textCellClassName: classes.textCell,
        headerCellClassName: classes.headerCell,
        isCheckpointsLoaded,
        checkpoints: checkpointsData?.data,
    });
  }, [isCheckpointsLoaded]);

  const handleDeleteUser = (user: User) => {
    deleteUser({ id: user.id })
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
        Пользователи
      </Text>
    );
  };

  if (isUsersLoading || isUsersUninitialized) {
    return (
      <>
        {getPageCommon()}
        <Container className={classes.container}>
            <CircularProgress />
        </Container>
      </>
    );
  } else if (usersHasErrorState || usersData?.data == null) {
    return (
      <>
        {getPageCommon()}
        <PageFallback message={FAILED_TO_LOAD_MESSAGE} refetch={refetchUsers} />
      </>
    );
  }

  return (
    <>
      {getPageCommon()}
      <AppTable<User>
        items={usersData.data}
        columns={columns}
        fileName="Checkpoints"
        onDelete={handleDeleteUser}
        messages={MESSAGES}
        editable="d"
      />
    </>
  );
};
