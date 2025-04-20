import { Box, Button, Card, createUseStyles, Input, notification, Text } from '@v-uik/base';
import { ErrorDescription } from '@shared/common/atoms';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Search } from '@v-uik/icons';
import { MESSAGES } from '../constants';

const useStyles = createUseStyles((theme) => ({
  formContainer: {
    display: 'flex',
    gap: theme.spacing(4),
    alignItems: 'flex-end',
    marginBottom: theme.spacing(4)
  },
  inputField: {
    width: '300px'
  }
}));

type FormValues = {
  expeditionId: string;
};

type Props = {
  onSearch: (id: number) => void;
};

export const LogistSearchForm = ({ onSearch }: Props) => {
  const classes = useStyles();
  const methods = useForm<FormValues>({
    defaultValues: {
      expeditionId: '',
    }
  });

  const handleSubmit = (data: FormValues) => {
    const id = parseInt(data.expeditionId, 10);
    
    if (isNaN(id) || id <= 0) {
      notification.error(
        <ErrorDescription>{MESSAGES.INVALID_EXPEDITION_ID}</ErrorDescription>,
        {
          direction: 'vertical',
          title: 'Ошибка'
        }
      );
      return;
    }

    onSearch(id);
  };

  return (
    <Card>
      <Text kind="h6" gutterBottom>Поиск экспедиции</Text>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Box className={classes.formContainer}>
            <Controller
              control={methods.control}
              name="expeditionId"
              render={({ field }) => (
                <Input
                  label="ID экспедиции"
                  size="sm"
                  className={classes.inputField}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
            <Button 
              type="submit" 
              kind="contained" 
              color="primary"
              prefixIcon={<Search />}
            >
              Найти
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Card>
  );
}; 