import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../schemas/loginSchema';
import { useLoginMutation } from '@api/auth/authApi';
import { Box, Button, createUseStyles, notification } from '@v-uik/base';
import { ErrorDescription, InputField } from '@shared/common/atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTER_PATHS } from '@shared/common/constants';
import { useAppDispatch } from '@store/store';
import { loginSuccess } from '@store/auth/auth.slice';
import { isErrorResponse } from '@shared/common/utils';
import { PasswordField } from '@shared/common/atoms/form';

const useStyles = createUseStyles((theme) => ({
  loginForm: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2)
  },
  submitButton: {
    marginTop: theme.spacing(8)
  }
}));

export const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { handleSubmit } = form;
  const classes = useStyles();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = (data: LoginFormData) => {
    login(data)
      .unwrap()
      .then((payload) => {
        dispatch(loginSuccess(payload));
        window.location.replace(ROUTER_PATHS.ROOT);
      })
      .catch((error) => {
        console.log('some error', error)
        if (isErrorResponse(error)) {
          console.log('error is errorResponse ', error)
            notification.error(
                <ErrorDescription>
                    {error?.data.detail || 'Ошибка входа'}
                </ErrorDescription>,
                { title: 'Ошибка входа', direction: 'vertical' }
            );
        } else {
            notification.error(
                <ErrorDescription>
                    {error instanceof Error ? error.message : 'Ошибка входа'}
                </ErrorDescription>,
                { title: 'Ошибка входа', direction: 'vertical' }
            );
        }
      });
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleFormSubmit}>
        <Box className={classes.loginForm}>
          <InputField 
            label="Логин"
            name="username"
            placeholder="Введите логин"
          />
          <PasswordField 
            label="Пароль"
            name="password"
            placeholder="Введите пароль"
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
            {isLoading ? 'Загрузка...' : 'Войти'}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};