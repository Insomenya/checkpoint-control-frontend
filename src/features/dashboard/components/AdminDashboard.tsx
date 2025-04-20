import React from 'react';
import { Accordion, AccordionItem, Card, Text } from '@v-uik/base';
import { Dashboard, Users, InfoCircle } from '@v-uik/icons';
import { useGetUserStatsQuery } from '@/api/users/usersApi';
import { CircularProgressCentered } from '@shared/common/atoms';
import { ADMIN_FAQ_ITEMS } from '../constants';

export const AdminDashboard: React.FC = () => {
  const { data, isLoading, error } = useGetUserStatsQuery();
  const [expandedFaq, setExpandedFaq] = React.useState<string | null>(null);

  const handleOpenFaq = (id: string) => () => {
    setExpandedFaq(id === expandedFaq ? null : id);
  };

  if (isLoading) {
    return <CircularProgressCentered />;
  }

  if (error) {
    return <Text color="error">Ошибка загрузки данных: {(error as any).message}</Text>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users color="#3669E5" />
              <Text kind="titleLg">Всего пользователей</Text>
            </div>
          }
          style={{ flex: '1', minWidth: '250px' }}
        >
          <Text kind="displayLg" style={{ fontSize: '48px', fontWeight: 'bold', color: '#3669E5' }}>
            {data?.total_users || 0}
          </Text>
        </Card>

        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <InfoCircle color="#14B8A6" />
              <Text kind="titleLg">Статистика по ролям</Text>
            </div>
          }
          style={{ flex: '1', minWidth: '250px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data?.users_by_role.map(({ role, count }) => (
              <div key={role} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text kind="bodyMd">{role}</Text>
                <Text kind="bodyMd" style={{ fontWeight: 'bold' }}>{count}</Text>
              </div>
            ))}
          </div>
        </Card>

        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Dashboard color="#F59E0B" />
              <Text kind="titleLg">Состояние аккаунтов</Text>
            </div>
          }
          style={{ flex: '1', minWidth: '250px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text kind="bodyMd">С установленным паролем</Text>
              <Text kind="bodyMd" style={{ fontWeight: 'bold' }}>{data?.password_set_count || 0}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text kind="bodyMd">Без пароля</Text>
              <Text kind="bodyMd" style={{ fontWeight: 'bold' }}>{data?.password_not_set_count || 0}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text kind="bodyMd">Операторы без КПП</Text>
              <Text kind="bodyMd" style={{ fontWeight: 'bold' }}>{data?.operators_without_checkpoint_count || 0}</Text>
            </div>
          </div>
        </Card>
      </div>

      <Card
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users color="#3669E5" />
            <Text kind="titleLg">Вопросы и ответы для администраторов</Text>
          </div>
        }
      >
        <Accordion>
          {ADMIN_FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              expanded={expandedFaq === `admin-faq-${index}`}
              header={item.question}
              onClick={handleOpenFaq(`admin-faq-${index}`)}
            >
              <Text kind="bodyMd">{item.answer}</Text>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}; 