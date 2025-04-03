import { Good } from '@/models/goods';
import { API_PATHS } from '@shared/common/constants';
import { faker } from '@faker-js/faker';
import { createServer, Model, Factory, Response } from 'miragejs';
import { UserRoles } from '@/models/common';
import { Organization } from '@/models/organizations';
import { randexp } from 'randexp';
import { phoneRegex } from '@shared/business/utils';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      good: Model.extend<Partial<Good>>({}),
      organization: Model.extend<Partial<Organization>>({}),
    },

    factories: {
      good: Factory.extend<Partial<Good>>({
        name() {
          return faker.commerce.productName();
        },
        description() {
          return faker.commerce.productDescription();
        },
        quantity() {
          return faker.number.float({ min: 1, max: 1000, fractionDigits: 2});
        },
        unitOfMeasurement() {
          return faker.helpers.arrayElement(['шт', 'кг', 'л', 'м']);
        },
      }),

      organization: Factory.extend<Partial<Organization>>({
        name() {
          return faker.company.name();
        },
        address() {
          return faker.location.streetAddress({ useFullAddress: true })
        },
        contactPhone() {
          return randexp(phoneRegex)
        },
        isOwn() {
          return false
        },
      }),
    },

    seeds(server) {
      server.createList('good', 50);
      server.createList('organization', 20);
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

        const fullNames = {
          admin: 'Аркадий Доступов',
          operator: 'Светлана Быстрорук',
          logistician: 'Виктория Накладнова',
        };

        if (result) {
          let user = result[1] as UserRoles;

          return {
            user: { id: 1, username: user, role: user, fullName: fullNames[user] },
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

      // GET /api/org
      this.get(API_PATHS.ORGANIZATIONS.ROOT, (schema) => {
        let organizations = schema.all('organization').models as Organization[];

        return new Response(200, {}, { organizations });
      });

      // POST /api/org
      this.post(API_PATHS.ORGANIZATIONS.ROOT, (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('organization', attrs);
      });

      // PUT /api/org/:id
      this.put(`${API_PATHS.ORGANIZATIONS.ROOT}/:id`, (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody) as Partial<Organization>;
        const organization = schema.find('organization', id);

        if (!organization) {
          return new Response(404, {}, { error: 'Organization not found' });
        }

        organization.update(attrs);
        return new Response(200, {}, organization.attrs);
      });

      // DELETE /api/org/:id
      this.del(`${API_PATHS.ORGANIZATIONS.ROOT}/:id`, (schema, request) => {
        const id = request.params.id;
        const organization = schema.find('organization', id);
        organization?.destroy();
        return new Response(204);
      });
    },
  });
};
