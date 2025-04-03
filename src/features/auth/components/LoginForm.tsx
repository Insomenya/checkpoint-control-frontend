import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../schemas/loginSchema';
import { useLoginMutation } from '@api/auth/authApi';
import { Box, Button, createUseStyles, notification } from '@v-uik/base';
import { ErrorDescription, InputField } from '@shared/common/atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTER_PATHS } from '@shared/common/constants';
import { useAppDispatch, useAppSelector } from '@store/store';
import { loginSuccess } from '@store/auth/auth.slice';
import { isErrorResponse } from '@shared/common/utils';
import { PasswordField } from '@shared/common/atoms/form';
import { verifyKeySet } from '@store/common/common.slice';
import { selectVerifyKey } from '@store/common/common.selectors';

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
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: LoginFormData) => {
    login(data)
      .unwrap()
      .then((payload) => {
        dispatch(loginSuccess(payload));
        window.location.replace(ROUTER_PATHS.ROOT);
        // navigate(ROUTER_PATHS.ROOT);
      })
      .catch((error) => {
        if (isErrorResponse(error)) {
          notification.error(
            <ErrorDescription>{error.data.message}</ErrorDescription>,
            {
              direction: 'vertical',
              title: 'Ошибка входа'
            }
          )
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