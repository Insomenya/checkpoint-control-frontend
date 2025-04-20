import { CircularProgress, Container, createUseStyles, notification, Text } from '@v-uik/base';
import { PageFallback } from '@shared/common/molecules';
import { AppTable } from '@shared/common/organisms';
import { ErrorDescription } from '@shared/common/atoms';
import { isErrorResponse } from '@shared/common/utils';
import { useCreateOrganizationMutation, useDeleteOrganizationMutation, useGetOrganizationsQuery, useUpdateOrganizationMutation } from '@api/organizations/organizationsApi';
import { Organization, OrganizationIdParam } from '@/models/organizations';
import { FAILED_TO_LOAD_MESSAGE, MESSAGES } from '@/features/organizations/constants';
import { getColumns, OrganizationModal } from '@/features/organizations/components';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(10)
  }
}));

export const RegisterOrganizations = () => {
  const { data, isLoading, isUninitialized, isError, refetch } = useGetOrganizationsQuery();
  const classes = useStyles();
  const [createOrganization] = useCreateOrganizationMutation();
  const [updateOrganization] = useUpdateOrganizationMutation();
  const [deleteOrganization] = useDeleteOrganizationMutation();

  const handleAddOrganization = (organization: Organization) => {
    createOrganization(organization)
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

  const handleUpdateOrganization = (organization: Organization) => {
    if (typeof organization.id === 'number') {
      const { id, ...updateData } = organization;
      updateOrganization({ id, ...updateData })
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
    }
  };

  const handleDeleteOrganization = (organization: Organization) => {
    if (typeof organization.id === 'number') {
      const idParam: OrganizationIdParam = { id: organization.id };
      deleteOrganization(idParam)
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
    }
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
      <AppTable<Organization>
        items={data}
        columns={getColumns()}
        fileName="Organizations"
        ModalComponent={OrganizationModal}
        onAdd={handleAddOrganization}
        onDelete={handleDeleteOrganization}
        onUpdate={handleUpdateOrganization}
        messages={MESSAGES}
        pdfExportable
        excelExportable
        editable="ced"
      />
    </>
  );
};
