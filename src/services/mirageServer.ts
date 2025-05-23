import { Good } from '@/models/goods';
import { API_PATHS } from '@shared/common/constants';
import { faker } from '@faker-js/faker';
import { createServer, Model, Factory, Response } from 'miragejs';
import { UserRoles } from '@/models/common';
import { Organization } from '@/models/organizations';
import { randexp } from 'randexp';
import { phoneRegex } from '@shared/business/utils';
import { Checkpoint } from '@/models/checkpoints';
import { User } from '@/models/auth';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      good: Model.extend<Partial<Good>>({}),
      organization: Model.extend<Partial<Organization>>({}),
      checkpoint: Model.extend<Partial<Checkpoint>>({}),
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      good: Factory.extend<Partial<Good>>({
        name() {
          return faker.commerce.productName();
        },
        description() {
          return faker.commerce.productDescription();
        },
        unit_of_measurement() {
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
        contact_phone() {
          return randexp(phoneRegex)
        },
      }),

      checkpoint: Factory.extend<Partial<Checkpoint>>({
        name() {
          return faker.hacker.abbreviation() + faker.number.int({ min: 1, max: 20 });
        },
        zone_id() {
          return faker.helpers.arrayElement([1, 2, 3]);
        },
      }),
    },

    seeds(server) {
      server.createList('good', 50);
      server.createList('organization', 20);
      server.createList('checkpoint', 10);

      server.create('user', {
        username: 'admin',
        role: 'admin',
        fullName: 'Аркадий Доступов',
      });

      server.create('user', {
        username: 'operator',
        role: 'operator',
        fullName: 'Светлана Быстрорук',
        checkpoint: { id: 1, name: 'КПП-1' }
      });

      server.create('user', {
        username: 'logistician',
        role: 'logistician',
        fullName: 'Виктория Накладнова',
      });
    },

    routes() {
      this.namespace = API_PATHS.ROOT;

      // Заглушка для входа
      this.post(`${API_PATHS.AUTH.ROOT}${API_PATHS.AUTH.CREATE}`, (_schema, request) => {
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
      this.post(`${API_PATHS.AUTH.ROOT}${API_PATHS.AUTH.REFRESH}`, (_schema, request) => {
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
      this.post(`${API_PATHS.AUTH.ROOT}${API_PATHS.AUTH.VERIFY}`, (_schema, request) => {
        const { token } = JSON.parse(request.requestBody);
      
        if (token.test(/fake-(.*)-token/)) {
          return {
            token: token,
          };
        }
      
        return new Response(401, {}, { error: 'Недействительный refresh-токен' });
      });

      // Получение данных пользователя
      this.get(`${API_PATHS.AUTH.ROOT}${API_PATHS.AUTH.DETAILS}`, (_schema, request) => {
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
        let data = schema.all('good').models as Good[];

        return new Response(200, {}, { data });
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

      // GET /api/orgs
      this.get(API_PATHS.ORGS.ROOT, (schema) => {
        let data = schema.all('organization').models as Organization[];

        return new Response(200, {}, { data });
      });

      // POST /api/orgs
      this.post(API_PATHS.ORGS.ROOT, (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('organization', attrs);
      });

      // PUT /api/orgs/:id
      this.put(`${API_PATHS.ORGS.ROOT}/:id`, (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody) as Partial<Organization>;
        const organization = schema.find('organization', id);

        if (!organization) {
          return new Response(404, {}, { error: 'Organization not found' });
        }

        organization.update(attrs);
        return new Response(200, {}, organization.attrs);
      });

      // DELETE /api/orgs/:id
      this.del(`${API_PATHS.ORGS.ROOT}/:id`, (schema, request) => {
        const id = request.params.id;
        const organization = schema.find('organization', id);
        organization?.destroy();
        return new Response(204);
      });

      // GET /api/checkpoints
      this.get(API_PATHS.CHECKPOINTS.ROOT, (schema) => {
        let data = schema.all('checkpoint').models as Checkpoint[];

        return new Response(200, {}, { data });
      });

      // POST /api/checkpoints
      this.post(API_PATHS.CHECKPOINTS.ROOT, (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('checkpoint', attrs);
      });

      // PUT /api/checkpoints/:id
      this.put(`${API_PATHS.CHECKPOINTS.ROOT}/:id`, (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody) as Partial<Checkpoint>;
        const checkpoint = schema.find('checkpoint', id);

        if (!checkpoint) {
          return new Response(404, {}, { error: 'Checkpoint not found' });
        }

        checkpoint.update(attrs);
        return new Response(200, {}, checkpoint.attrs);
      });

      // DELETE /api/checkpoints/:id
      this.del(`${API_PATHS.CHECKPOINTS.ROOT}/:id`, (schema, request) => {
        const id = request.params.id;
        const checkpoint = schema.find('checkpoint', id);
        checkpoint?.destroy();
        return new Response(204);
      });

      // GET /api/auth/users
      this.get(`${API_PATHS.AUTH.ROOT}${API_PATHS.AUTH.USERS}`, (schema) => {
        let data = schema.all('user').models as User[];

        return new Response(200, {}, { data });
      });

      // POST /api/auth/signup
      this.post(`${API_PATHS.AUTH.ROOT}${API_PATHS.AUTH.SIGNUP}`, (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('user', attrs);
      });

      // POST /api/auth/setpass/:token
      this.post(`${API_PATHS.AUTH.ROOT}${API_PATHS.AUTH.SETPASS}/:token`, (_schema, request) => {
        const { password } = JSON.parse(request.requestBody);
        return new Response(200, {}, { message: 'Пароль успешно установлен' });
      });
    },
  });
};
