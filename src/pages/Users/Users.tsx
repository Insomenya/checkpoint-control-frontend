import { CircularProgress, Container, createUseStyles, Text } from '@v-uik/base';
import { PageFallback } from '@shared/common/molecules';
import { AppTable } from '@shared/common/organisms';
import { FAILED_TO_LOAD_MESSAGE, MESSAGES, USERS_CUSTOM_FILTERS } from '@/features/users/constants';
import { useGetUsersQuery } from '@api/users/usersApi';
import { getColumns } from '@/features/users/components';
import { useMemo } from 'react';
import { UserDTO } from '@/models/users';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(10)
  },
  textCell: {
    padding: [theme.spacing(3.5), theme.spacing(4)]
  }
}));

export const Users = () => {
  const { data: usersData, isLoading: isUsersLoading, isUninitialized: isUsersUninitialized, isError: usersHasErrorState, refetch: refetchUsers } = useGetUsersQuery();

  const classes = useStyles();

  const columns = useMemo(() => {
    return getColumns({
        textCellClassName: classes.textCell
    });
  }, [classes.textCell]);

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
  } else if (usersHasErrorState || !usersData) {
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
      <AppTable<UserDTO>
        items={usersData}
        columns={columns}
        fileName="Пользователи"
        messages={MESSAGES}
        customFilters={USERS_CUSTOM_FILTERS}
      />
    </>
  );
};
