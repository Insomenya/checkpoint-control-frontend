import { GetResponseDTO } from "../common";

// Единицы измерения товаров
export type UnitOfMeasurement = 'шт' | 'кг' | 'л' | 'м';

// Базовая модель товара
export type Good = {
    id?: number;
    name: string;
    description: string;
    unit_of_measurement: UnitOfMeasurement;
};

// Модель товара с отображаемым названием единицы измерения
export type GoodWithDisplayUnit = {
    id: number;
    name: string;
    description: string;
    unit_of_measurement: UnitOfMeasurement;
    unit_of_measurement_display: string;
};

// Модель ответа на запрос списка товаров
export type GetGoodsResponseDTO = GoodWithDisplayUnit[];

// Модель ответа на запрос данных конкретного товара
export type GetGoodByIdResponseDTO = GoodWithDisplayUnit;

// Модель запроса на создание нового товара
export type CreateGoodRequestDTO = {
    name: string;
    description: string;
    unit_of_measurement: UnitOfMeasurement;
};

// Модель ответа на запрос создания нового товара
export type CreateGoodResponseDTO = GoodWithDisplayUnit;

// Модель запроса на полное обновление товара
export type UpdateGoodRequestDTO = CreateGoodRequestDTO;

// Модель ответа на запрос обновления товара
export type UpdateGoodResponseDTO = GoodWithDisplayUnit;

// Модель запроса на частичное обновление товара
export type PatchGoodRequestDTO = Partial<CreateGoodRequestDTO>;

// Параметр для запросов, требующих ID товара
export type GoodIdParam = {
    id: number;
};

export type GetGoodsPaginatedRequestDTO = {
    page: number;
    limit: number;
    sort: string;
    order: 'asc' | 'desc';
    filters: object;
};

export type PostAddGoodRequestDTO = Omit<Good, 'id'>;

export type PutEditGoodRequestDTO = Good;

export type DeleteGoodRequestDTO = Pick<Good, 'id'>;
