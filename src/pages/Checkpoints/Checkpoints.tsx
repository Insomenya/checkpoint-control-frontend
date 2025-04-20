import { CircularProgress, Container, createUseStyles, notification, Text } from '@v-uik/base';
import { PageFallback } from '@shared/common/molecules';
import { AppTable } from '@shared/common/organisms';
import { ErrorDescription } from '@shared/common/atoms';
import { isErrorResponse } from '@shared/common/utils';
import { useCreateCheckpointMutation, useDeleteCheckpointMutation, useGetCheckpointsQuery, useUpdateCheckpointMutation } from '@api/checkpoints/checkpointsApi';
import { Checkpoint, CreateCheckpointRequestDTO } from '@/models/checkpoints';
import { FAILED_TO_LOAD_MESSAGE, MESSAGES } from '@/features/checkpoints/constants';
import { CheckpointModal, getColumns } from '@/features/checkpoints/components';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(10)
  },
  textCell: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
}));

export const Checkpoints = () => {
  const { data, isLoading, isUninitialized, isError, refetch } = useGetCheckpointsQuery();
  const classes = useStyles();
  const [createCheckpoint] = useCreateCheckpointMutation();
  const [updateCheckpoint] = useUpdateCheckpointMutation();
  const [deleteCheckpoint] = useDeleteCheckpointMutation();

  const handleAddCheckpoint = (checkpoint: Checkpoint) => {
    createCheckpoint({
      name: checkpoint.name,
      zone_id: checkpoint.zone_id
    })
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

  const handleUpdateCheckpoint = (checkpoint: Checkpoint) => {
    if (checkpoint.id === undefined) {
      return;
    }

    updateCheckpoint({
      id: checkpoint.id,
      name: checkpoint.name,
      zone_id: checkpoint.zone_id
    })
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

  const handleDeleteCheckpoint = (checkpoint: Checkpoint) => {
    if (checkpoint.id === undefined) {
      return;
    }

    deleteCheckpoint({ id: checkpoint.id })
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
        Регистрировать КПП
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
      <AppTable<Checkpoint>
        items={data}
        columns={getColumns(classes.textCell)}
        fileName="Список КПП"
        ModalComponent={CheckpointModal}
        onAdd={handleAddCheckpoint}
        onDelete={handleDeleteCheckpoint}
        onUpdate={handleUpdateCheckpoint}
        messages={MESSAGES}
        pdfExportable
        excelExportable
        editable="ced"
      />
    </>
  );
};
