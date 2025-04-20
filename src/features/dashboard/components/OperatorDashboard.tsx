import React from 'react';
import { Accordion, AccordionItem, Card, Text } from '@v-uik/base';
import { ArrowRight, ArrowLeft, InfoCircle } from '@v-uik/icons';
import { useGetExpeditionsByCheckpointQuery } from '@/api/expeditions/expeditionsApi';
import { useGetUserDataQuery } from '@/api/auth/authApi';
import { CircularProgressCentered } from '@shared/common/atoms';
import { OPERATOR_FAQ_ITEMS } from '../constants';

export const OperatorDashboard: React.FC = () => {
  const { data: userData, isLoading: isUserLoading } = useGetUserDataQuery(null);
  const checkpointId = userData?.checkpoint?.id;
  
  const { data: inboundExpeditions, isLoading: isInboundLoading } = useGetExpeditionsByCheckpointQuery(
    { checkpointId: checkpointId || 0, direction: 'IN' },
    { skip: !checkpointId }
  );
  
  const { data: outboundExpeditions, isLoading: isOutboundLoading } = useGetExpeditionsByCheckpointQuery(
    { checkpointId: checkpointId || 0, direction: 'OUT' },
    { skip: !checkpointId }
  );

  const [expandedFaq, setExpandedFaq] = React.useState<string | null>(null);

  const handleOpenFaq = (id: string) => () => {
    setExpandedFaq(id === expandedFaq ? null : id);
  };

  if (isUserLoading || isInboundLoading || isOutboundLoading) {
    return <CircularProgressCentered />;
  }

  if (!checkpointId) {
    return (
      <Card style={{ marginBottom: '24px' }}>
        <Text color="error">Вы не привязаны к КПП. Обратитесь к администратору.</Text>
      </Card>
    );
  }

  const inboundCount = inboundExpeditions?.length || 0;
  const outboundCount = outboundExpeditions?.length || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Card>
        <Text kind="titleLg" style={{ marginBottom: '16px' }}>
          КПП: {userData?.checkpoint?.name}
        </Text>
      </Card>
      
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowRight color="#3669E5" />
              <Text kind="titleLg">Въезд</Text>
            </div>
          }
          style={{ flex: '1', minWidth: '250px' }}
        >
          <Text kind="displayLg" style={{ fontSize: '48px', fontWeight: 'bold', color: '#3669E5' }}>
            {inboundCount}
          </Text>
          <Text kind="bodyMd">экспедиций ожидают подтверждения</Text>
        </Card>

        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft color="#14B8A6" />
              <Text kind="titleLg">Выезд</Text>
            </div>
          }
          style={{ flex: '1', minWidth: '250px' }}
        >
          <Text kind="displayLg" style={{ fontSize: '48px', fontWeight: 'bold', color: '#14B8A6' }}>
            {outboundCount}
          </Text>
          <Text kind="bodyMd">экспедиций ожидают подтверждения</Text>
        </Card>
      </div>

      <Card
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <InfoCircle color="#3669E5" />
            <Text kind="titleLg">Вопросы и ответы для операторов КПП</Text>
          </div>
        }
      >
        <Accordion>
          {OPERATOR_FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              expanded={expandedFaq === `operator-faq-${index}`}
              header={item.question}
              onClick={handleOpenFaq(`operator-faq-${index}`)}
            >
              <Text kind="bodyMd">{item.answer}</Text>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}; 