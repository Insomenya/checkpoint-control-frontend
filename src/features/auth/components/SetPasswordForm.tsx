import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setPasswordSchema, SetPasswordFormData } from '../schemas/setPasswordSchema';
import { Box, Button, createUseStyles, notification } from '@v-uik/base';
import { ErrorDescription } from '@shared/common/atoms';
import { PasswordField } from '@shared/common/atoms/form';
import { useSetPasswordMutation } from '@api/users/usersApi';
import { isErrorResponse } from '@shared/common/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from '@shared/common/constants';

const useStyles = createUseStyles((theme) => ({
  form: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2)
  },
  submitButton: {
    marginTop: theme.spacing(4)
  },
  successMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(4),
    textAlign: 'center',
    flex: 1
  },
  redirectLink: {
    textDecoration: 'none',
    marginTop: theme.spacing(2)
  }
}));

type SetPasswordFormProps = {
  token: string;
};

export const SetPasswordForm = ({ token }: SetPasswordFormProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const form = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit } = form;
  const classes = useStyles();
  const [setPassword, { isLoading }] = useSetPasswordMutation();

  const onSubmit = (data: SetPasswordFormData) => {
    setPassword({ 
      token, 
      data: { password: data.password } 
    })
      .unwrap()
      .then(() => {
        setIsSuccess(true);
        
        let timer = countdown;
        const interval = setInterval(() => {
          timer -= 1;
          setCountdown(timer);
          if (timer <= 0) {
            clearInterval(interval);
            window.location.replace(`/${ROUTER_PATHS.LOGIN}`);
          }
        }, 3000);
      })
      .catch((error) => {
        if (isErrorResponse(error)) {
          notification.error(
            <ErrorDescription>{error.data.message || 'Ошибка при установке пароля'}</ErrorDescription>,
            {
              direction: 'vertical',
              title: 'Ошибка'
            }
          );
        }
      });
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  if (isSuccess) {
    return (
      <Box className={classes.successMessage}>
        <p>Пароль успешно установлен!</p>
        <p>Вы будете перенаправлены на страницу входа через {countdown} секунд...</p>
        <Link to={`/${ROUTER_PATHS.LOGIN}`} className={classes.redirectLink}>
          <Button kind="contained" color="primary">
            Перейти ко входу
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleFormSubmit}>
        <Box className={classes.form}>
          <PasswordField 
            label="Пароль"
            name="password"
            placeholder="Введите пароль"
          />
          <PasswordField 
            label="Подтверждение пароля"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
          />
          <Button
            type="submit"
            onClick={handleFormSubmit}
            kind="contained"
            color="primary"
            disabled={isLoading}
            className={classes.submitButton}
            fullWidth
          >
            {isLoading ? 'Загрузка...' : 'Установить пароль'}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
}; 