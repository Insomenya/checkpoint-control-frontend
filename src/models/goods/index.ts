import { GetResponseDTO } from "../common";

export type UnitOfMeasurement = 'шт' | 'кг' | 'л' | 'м';

export type Good = {
    id?: number;
    name: string;
    description: string;
    unit_of_measurement: UnitOfMeasurement;
};

export type GoodWithDisplayUnit = {
    id: number;
    name: string;
    description: string;
    unit_of_measurement: UnitOfMeasurement;
    unit_of_measurement_display: string;
};

export type GetGoodsResponseDTO = GoodWithDisplayUnit[];

export type GetGoodByIdResponseDTO = GoodWithDisplayUnit;

export type CreateGoodRequestDTO = {
    name: string;
    description: string;
    unit_of_measurement: UnitOfMeasurement;
};

export type CreateGoodResponseDTO = GoodWithDisplayUnit;

export type UpdateGoodRequestDTO = CreateGoodRequestDTO;

export type UpdateGoodResponseDTO = GoodWithDisplayUnit;

export type PatchGoodRequestDTO = Partial<CreateGoodRequestDTO>;

export type GoodIdParam = {
    id: number;
};

export type PostAddGoodRequestDTO = Omit<Good, 'id'>;

export type PutEditGoodRequestDTO = Good;

export type DeleteGoodRequestDTO = Pick<Good, 'id'>;
