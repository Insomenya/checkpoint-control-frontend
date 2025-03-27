import { GetGoodsRequestDTO, Good } from '@/models/goods';
import { API_PATHS } from '@shared/constants';
import { isArray } from '@v-uik/base';
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
      this.get(API_PATHS.GOODS.ROOT, (schema, request) => {
        const queryParams = request.queryParams;
        const queryParamPage = isArray(queryParams.page) ? queryParams.page?.toString() : queryParams.page;
        const queryParamLimit = isArray(queryParams.limit) ? queryParams.limit?.toString() : queryParams.limit;
        const queryParamSort = isArray(queryParams.sort) ? queryParams.sort?.toString() : queryParams.sort;
        const page = parseInt(queryParamPage || '1', 10);
        const limit = parseInt(queryParamLimit || '10', 10);
        const sort = (queryParamSort || 'name') as keyof Good;
        const order = queryParams.order === 'desc' ? 'desc' : 'asc';
        const filters = queryParams.filters ? JSON.parse(isArray(queryParams.filters) ? queryParams.filters.toString() : queryParams.filters) : {};

        let goods = schema.all('good').models as Good[];

        // Фильтрация
        if (filters) {
          const parsedFilters = JSON.parse(filters);
          if (parsedFilters.name) {
            goods = goods.filter((good) =>
              good.name.toLowerCase().includes(parsedFilters.name.toLowerCase())
            );
          }
        }

        // Сортировка
        goods.sort((a, b) => {
          const fieldA = a[sort];
          const fieldB = b[sort];

          if (typeof fieldA === 'number' && typeof fieldB === 'number') {
            return order === 'asc' ? fieldA - fieldB : fieldB - fieldA;
          } else if (typeof fieldA === 'string' && typeof fieldB === 'string') {
            return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
          } else {
            return 0;
          }
        });

        // Пагинация
        const total = goods.length;
        const start = (page - 1) * limit;
        const end = page * limit;
        const paginatedGoods = goods.slice(start, end);

        return new Response(200, {}, { data: paginatedGoods, pagination: { total, page, limit } });
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
