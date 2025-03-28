import { Good } from '@/models/goods';
import { API_PATHS } from '@shared/constants';
import { createServer, Model, Factory, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      good: Model.extend<Partial<Good>>({}),
    },

    factories: {
      good: Factory.extend<Partial<Good>>({
        name(i: number) {
          return `Товар ${i + 1}`;
        },
        description() {
          return `Описание товара`;
        },
        quantity() {
          return Math.floor(Math.random() * 1000);
        },
        unit_of_measurement() {
          const units = ['шт', 'кг', 'л', 'м'];
          return units[Math.floor(Math.random() * units.length)];
        },
      }),
    },

    seeds(server) {
      server.createList('good', 50); // Создаем 50 тестовых записей
    },

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

      // Обновить jwt токен
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

      // Проверить jwt токен
      this.post(API_PATHS.AUTH.VERIFY_TOKEN, (_schema, request) => {
        const { token } = JSON.parse(request.requestBody);
      
        if (token === 'new-fake-jwt-token') {
          return {
            token: 'new-fake-jwt-token',
          };
        }
      
        return new Response(401, {}, { error: 'Недействительный refresh-токен' });
      });

      // Получение данных пользователя
      this.get(API_PATHS.AUTH.GET_USER_DATA, () => {
        return {
          user: { id: 1, username: 'admin', role: 'admin' },
        };
      });

      // GET /api/goods
      this.get(API_PATHS.GOODS.ROOT, (schema) => {
        let goods = schema.all('good').models as Good[];

        return new Response(200, {}, { goods });
      });

      // POST /api/goods
      this.post(API_PATHS.GOODS.ROOT, (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('good', attrs);
      });

      // PUT /api/goods/:id
      this.put(`${API_PATHS.GOODS.ROOT}/:id`, (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody) as Partial<Good>;
        const good = schema.find('good', id);

        if (!good) {
          return new Response(404, {}, { error: 'Good not found' });
        }

        good.update(attrs);
        return new Response(200, {}, good.attrs);
      });

      // DELETE /api/goods/:id
      this.del(`${API_PATHS.GOODS.ROOT}/:id`, (schema, request) => {
        const id = request.params.id;
        const good = schema.find('good', id);
        good?.destroy();
        return new Response(204);
      });
    },
  });
};
