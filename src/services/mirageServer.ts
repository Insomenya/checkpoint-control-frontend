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
    },
  });
}