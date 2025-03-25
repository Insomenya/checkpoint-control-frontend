import { API_PATHS } from '@shared/constants';
import { createServer, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    routes() {
      this.namespace = API_PATHS.ROOT;

      // Заглушка для входа
      this.post(API_PATHS.AUTH.LOGIN, (_schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);

        if (username === 'admin' && password === 'password') {
          return {
            token: 'fake-jwt-token',
            refreshToken: 'fake-refresh-token',
            user: { id: 1, username: 'admin', role: 'admin' },
          };
        }

        return new Response(401, {}, { message: 'Неверный логин или пароль' });
      });

      this.post(API_PATHS.AUTH.REFRESH_TOKEN, (_schema, request) => {
        const { refreshToken } = JSON.parse(request.requestBody);
      
        if (refreshToken === 'fake-refresh-token') {
          return {
            token: 'new-fake-jwt-token',
            refreshToken: 'new-fake-refresh-token',
          };
        }
      
        return new Response(401, {}, { error: 'Недействительный refresh-токен' });
      });

      this.post(API_PATHS.AUTH.VERIFY_TOKEN, (_schema, request) => {
        const { token } = JSON.parse(request.requestBody);
      
        if (token === 'new-fake-jwt-token') {
          return {
            token: 'new-fake-jwt-token',
          };
        }
      
        return new Response(401, {}, { error: 'Недействительный refresh-токен' });
      });
    },
  });
}