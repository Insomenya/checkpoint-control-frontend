import { GetResponseDTO } from "../common";

// Базовая модель КПП
export type Checkpoint = {
    id?: number;
    name: string;
    zone_id: number;
    zone_name?: string;
}

// Расширенная модель КПП с именем зоны
export type CheckpointWithZone = {
    id: number;
    name: string;
    zone_id: number;
    zone_name: string;
}

// Модель ответа на запрос списка КПП
export type GetCheckpointsResponseDTO = Checkpoint[];

// Модель ответа на запрос данных конкретного КПП
export type GetCheckpointByIdResponseDTO = Checkpoint;

// Модель запроса на создание нового КПП
export type CreateCheckpointRequestDTO = {
    name: string;
    zone_id: number;
};

// Модель ответа на запрос создания нового КПП
export type CreateCheckpointResponseDTO = CheckpointWithZone;

// Модель запроса на полное обновление КПП
export type UpdateCheckpointRequestDTO = CreateCheckpointRequestDTO;

// Модель ответа на запрос обновления КПП
export type UpdateCheckpointResponseDTO = CheckpointWithZone;

// Модель запроса на частичное обновление КПП
export type PatchCheckpointRequestDTO = Partial<CreateCheckpointRequestDTO>;

// Параметр для запросов, требующих ID КПП
export type CheckpointIdParam = {
    id: number;
};
