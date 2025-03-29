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

        if (password === 'password') {
          switch(username) {
            case 'admin':
            case 'operator':
            case 'logistician':
              return {
                user: {
                  id: 3,
                  username: username,
                  role: username
                },
                token: `fake-${username}-token`,
                refreshToken: `fake-${username}-refresh-token`
              };
          }
        }

        return new Response(401, {}, { message: 'Неверный логин или пароль' });
      });

      // Обновить jwt токен
      this.post(API_PATHS.AUTH.REFRESH_TOKEN, (_schema, request) => {
        const { refreshToken } = JSON.parse(request.requestBody);
        const result = refreshToken.match(/fake-(.*)-refresh-token/);

        if (result) {
          let username = result[1];

          return {
            token: `fake-${username}-token`,
            refreshToken: `fake-${username}-refresh-token`,
          };
        }
      
        return new Response(401, {}, { error: 'Недействительный refresh-токен' });
      });

      // Проверить jwt токен
      this.post(API_PATHS.AUTH.VERIFY_TOKEN, (_schema, request) => {
        const { token } = JSON.parse(request.requestBody);
      
        if (token.test(/fake-(.*)-token/)) {
          return {
            token: token,
          };
        }
      
        return new Response(401, {}, { error: 'Недействительный refresh-токен' });
      });

      // Получение данных пользователя
      this.get(API_PATHS.AUTH.GET_USER_DATA, (_schema, request) => {
        const authorization = request.requestHeaders.authorization;
        const result = authorization.match(/fake-(.*)-token/);

        if (result) {
          let user = result[1];

          return {
            user: { id: 1, username: user, role: user },
          };
        }

        return new Response(401, {}, { error: 'Недействительный токен' });
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
