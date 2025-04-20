import React from 'react';
import { Accordion, AccordionItem, Card, Text } from '@v-uik/base';
import { Truck, Package, InfoCircle } from '@v-uik/icons';
import { useGetAllExpeditionsQuery } from '@/api/expeditions/expeditionsApi';
import { CircularProgressCentered } from '@shared/common/atoms';
import { LOGISTICIAN_FAQ_ITEMS } from '../constants';

export const LogisticianDashboard: React.FC = () => {
  const { data: expeditions, isLoading, error } = useGetAllExpeditionsQuery();
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

  // Подсчет статистики по экспедициям
  const totalExpeditions = expeditions?.length || 0;
  const inboundExpeditions = expeditions?.filter(exp => exp.direction === 'IN').length || 0;
  const outboundExpeditions = expeditions?.filter(exp => exp.direction === 'OUT').length || 0;
  
  // Подсчет статистики по типам экспедиций
  const autoExpeditions = expeditions?.filter(exp => exp.type === 'auto').length || 0;
  const selfoutExpeditions = expeditions?.filter(exp => exp.type === 'selfout').length || 0;
  const selfautoExpeditions = expeditions?.filter(exp => exp.type === 'selfauto').length || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck color="#3669E5" />
              <Text kind="titleLg">Всего экспедиций</Text>
            </div>
          }
          style={{ flex: '1', minWidth: '250px' }}
        >
          <Text kind="displayLg" style={{ fontSize: '48px', fontWeight: 'bold', color: '#3669E5' }}>
            {totalExpeditions}
          </Text>
        </Card>

        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <InfoCircle color="#14B8A6" />
              <Text kind="titleLg">По направлению</Text>
            </div>
          }
          style={{ flex: '1', minWidth: '250px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text kind="bodyMd">Въезд</Text>
              <Text kind="bodyMd" style={{ fontWeight: 'bold' }}>{inboundExpeditions}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text kind="bodyMd">Выезд</Text>
              <Text kind="bodyMd" style={{ fontWeight: 'bold' }}>{outboundExpeditions}</Text>
            </div>
          </div>
        </Card>

        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package color="#F59E0B" />
              <Text kind="titleLg">По типу</Text>
            </div>
          }
          style={{ flex: '1', minWidth: '250px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text kind="bodyMd">Авто</Text>
              <Text kind="bodyMd" style={{ fontWeight: 'bold' }}>{autoExpeditions}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text kind="bodyMd">Самовынос</Text>
              <Text kind="bodyMd" style={{ fontWeight: 'bold' }}>{selfoutExpeditions}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text kind="bodyMd">Самовывоз</Text>
              <Text kind="bodyMd" style={{ fontWeight: 'bold' }}>{selfautoExpeditions}</Text>
            </div>
          </div>
        </Card>
      </div>

      <Card
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <InfoCircle color="#3669E5" />
            <Text kind="titleLg">Вопросы и ответы для логистов</Text>
          </div>
        }
      >
        <Accordion>
          {LOGISTICIAN_FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              expanded={expandedFaq === `logistician-faq-${index}`}
              header={item.question}
              onClick={handleOpenFaq(`logistician-faq-${index}`)}
            >
              <Text kind="bodyMd">{item.answer}</Text>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}; 