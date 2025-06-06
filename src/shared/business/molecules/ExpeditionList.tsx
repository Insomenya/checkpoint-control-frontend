import { useState } from 'react';
import { Box, Button, Card, createUseStyles, Select, Text } from '@v-uik/base';
import { useGetExpeditionsByCheckpointQuery } from '@api/expeditions/expeditionsApi';
import { ArrowLeft } from '@v-uik/icons';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4)
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  },
  actionsRow: {
    display: 'flex',
    gap: theme.spacing(2)
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.ref.palette.gray20}`,
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  selectedExpedition: {
    display: 'flex',
    gap: theme.spacing(4),
    alignItems: 'center'
  },
  selectWidth: {
    width: '200px'
  }
}));

type DirectionOption = {
  value: string;
  label: string;
};

type Props = {
  checkpointId: number;
  onSelect: (expeditionId: number) => void;
  selectedExpeditionId: number | null;
  onClearSelection: () => void;
  directionOptions: DirectionOption[];
  title?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
};

export const ExpeditionList = ({ 
  checkpointId, 
  onSelect,
  selectedExpeditionId,
  onClearSelection,
  directionOptions,
  title = 'Экспедиции для подтверждения',
  emptyMessage = 'Нет данных для отображения',
  loadingMessage = 'Загрузка списка экспедиций...',
  errorMessage = 'Не удалось загрузить данные'
}: Props) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('IN');
  
  const { data: expeditions, isLoading, isError } = useGetExpeditionsByCheckpointQuery({
    checkpointId,
    direction: direction || undefined
  });

  const handleDirectionChange = (value: string) => {
    setDirection(value);
  };

  const handleSelectExpedition = (id: number) => {
    onSelect(id);
  };

  if (selectedExpeditionId) {
    const expedition = expeditions?.find(exp => exp.id === selectedExpeditionId);
    
    return (
      <Card>
        <Box className={classes.selectedExpedition}>
          <Button 
            kind="outlined" 
            color="secondary" 
            size="sm"
            prefixIcon={<ArrowLeft />}
            onClick={onClearSelection}
          >
            Вернуться к списку
          </Button>
          <Text>Выбрана экспедиция: {expedition?.name || `ID: ${selectedExpeditionId}`}</Text>
        </Box>
      </Card>
    );
  }

  return (
    <Card>
      <Box className={classes.container}>
        <Box className={classes.headerContainer}>
          <Text kind="h6">{title}</Text>
          <Box className={classes.actionsRow}>
            <Select
              label="Направление"
              size="sm"
              options={directionOptions}
              value={direction}
              onChange={handleDirectionChange}
              className={classes.selectWidth}
            />
          </Box>
        </Box>

        {isLoading ? (
          <Text>{loadingMessage}</Text>
        ) : isError ? (
          <Text color="error">{errorMessage}</Text>
        ) : !expeditions || expeditions.length === 0 ? (
          <Text>{emptyMessage}</Text>
        ) : (
          expeditions.map((expedition) => (
            <Box key={expedition.id} className={classes.listItem}>
              <Box>
                <Text kind="subtitle2">{expedition.name}</Text>
                <Text>Направление: {expedition.direction_display}</Text>
                <Text>Тип: {expedition.type_display}</Text>
              </Box>
              <Button
                kind="contained"
                color="primary"
                size="sm"
                onClick={() => handleSelectExpedition(expedition.id)}
              >
                Выбрать
              </Button>
            </Box>
          ))
        )}
      </Box>
    </Card>
  );
}; 