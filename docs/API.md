# API

## Zones
| Method   | Path     | Description |
|----------|----------|----------|
| GET    | `/api/expeditions/zones/<current_zone_id>/`   | Получить зону по id   |

## Checkpoints
| Method   | Path     | Description |
|----------|----------|----------|
| POST    | `/api/expeditions/checkpoints/`   | Создать чекпоинт   |
| GET    | `/api/expeditions/checkpoints/<checkpoint_id>/`   | Получить чекпоинт по id   |
| DELETE    | `/api/expeditions/checkpoints/<checkpoint_id>/`   | Удалить чекпоинт по id   |

## Users
| Method   | Path     | Description |
|----------|----------|----------|
| POST    | `/api/auth/login/`   | Авторизация   |
| POST    | `/api/auth/token-verify/`   | Верификация сессии   |
| POST    | `/api/auth/register/`   | Регистрация пользователя   |
| PUT    | `/api/profile`   | Редактирование пользователя   |
| DELETE    | `/api/profile`   | Удаление пользователя   |
| GET    | `/api/users`   | Получение списка пользователей   |

## ExpeditionStatuses
| Method   | Path     | Description |
|----------|----------|----------|
| POST    | `/api/expeditions/<expedition_id>/status/`   | Создать статус   |
| GET    | `/api/expeditions/<expedition_id>/status/`   | Получить статус по id экспедиции   |
| PUT    | `/api/expeditions/<expedition_id>/status/`   | Редактирование статус по id экспедиции   |
| DELETE    | `/api/expeditions/<expedition_id>/status/`   | Удалить статус по id экспедиции   |

## Invoices
| Method   | Path     | Description |
|----------|----------|----------|
| POST    | `/api/expeditions/<expedition_id>/invoice/`   | Создать накладную   |
| GET    | `/api/expeditions/<expedition_id>/invoice/`   | Получить накладную по id экспедиции   |
| PUT    | `/api/expeditions/<expedition_id>/invoice/`   | Редактирование накладную по id экспедиции   |
| DELETE    | `/api/expeditions/<expedition_id>/invoice/`   | Удалить накладную по id экспедиции   |

## Goods
| Method   | Path     | Description |
|----------|----------|----------|
| POST    | `/api/expeditions/<expedition_id>/goods/`   | Создать список товаров   |
| GET    | `/api/expeditions/<expedition_id>/goods/<good_id>/`   | Получить товар по id экспедиции и id товара  |
| PUT    | `/api/expeditions/<expedition_id>/goods/<good_id>/`   | Редактирование товар по id экспедиции и id товара   |
| DELETE    | `/api/expeditions/<expedition_id>/goods/<good_id>/`   | Удалить товар по id экспедиции и id товара   |

## Organizations
| Method   | Path     | Description |
|----------|----------|----------|
| POST    | `/api/expeditions/<expedition_id>/orgs/`   | Создать организацию   |
| GET    | `/api/expeditions/<expedition_id>/orgs/<org_id>/`   | Получить организацию по id экспедиции и id организации  |
| PUT    | `/api/expeditions/<expedition_id>/orgs/<org_id>/`   | Редактировать организацию по id экспедиции и id организации   |
| DELETE    | `/api/expeditions/<expedition_id>/orgs/<org_id>/`   | Удалить организацию по id экспедиции и id организации   |

## Vehiclies
| Method   | Path     | Description |
|----------|----------|----------|
| POST    | `/api/expeditions/<expedition_id>/vehicles/`   | Зарегистрировать транспорт   |
| GET    | `/api/expeditions/<expedition_id>/vehicles/<vehicle_id>/`   | Получить транспорт по id экспедиции и id транспорта  |
| PUT    | `/api/expeditions/<expedition_id>/vehicles/<vehicle_id>/`   | Редактировать транспорт по id экспедиции и id транспорта   |
| DELETE    | `/api/expeditions/<expedition_id>/vehicles/<vehicle_id>/`   | Удалить транспорт по id экспедиции и id транспорта   |

## Persons
| Method   | Path     | Description |
|----------|----------|----------|
| POST    | `/api/expeditions/<expedition_id>/persons/`   | Зарегистрировать транспорт   |
| GET    | `/api/expeditions/<expedition_id>/persons/<person_id>`   | Получить персонал по id экспедиции и id персонала  |
| PUT    | `/api/expeditions/<expedition_id>/persons/<person_id>`   | Редактировать персонал по id экспедиции и id персонала   |
| DELETE    | `/api/expeditions/<expedition_id>/persons/<person_id>`   | Удалить персонал по id экспедиции и id персонала   |

## Expeditions
| Method   | Path     | Description |
|----------|----------|----------|
| POST    | `/api/expeditions/`   | Зарегистрировать экспедицию   |
| GET    | `/api/expeditions/<expedition_id>/`   | Получить экспедицию по id  |
| PUT    | `/api/expeditions/<expedition_id>/`   | Редактировать экспедицию по id   |
| DELETE    | `/api/expeditions/<expedition_id>/`   | Удалить экспедицию по id   |
