import { Text } from '@v-uik/base';
import { useGetUserDataQuery } from '@/api/auth/authApi';
import { AdminDashboard, LogisticianDashboard, OperatorDashboard } from '@/features/dashboard/components';
import { CircularProgressCentered } from '@shared/common/atoms';

export const Dashboard = () => {
  const { data: userData, isLoading, error } = useGetUserDataQuery(null);

  if (isLoading) {
    return <CircularProgressCentered />;
  }

  if (error) {
    return <Text color="error">Ошибка загрузки данных: {(error as any).message}</Text>;
  }

  const renderDashboardByRole = () => {
    if (!userData) {
      return <Text color="error">Не удалось загрузить данные пользователя</Text>;
    }

    switch (userData.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'logistician':
        return <LogisticianDashboard />;
      case 'operator':
        return <OperatorDashboard />;
      default:
        return <Text color="error">Неизвестная роль пользователя</Text>;
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Text kind="displaySm" style={{ marginBottom: '24px' }}>
        Дашборд
      </Text>
      {renderDashboardByRole()}
    </div>
  );
}; 