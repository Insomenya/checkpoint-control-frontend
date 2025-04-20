import { ConfirmationItem } from "../expeditions";

// Модель для создания подтверждения
export type CreateConfirmationRequestDTO = {
    expedition_id: number;
    checkpoint_id: number;
    status: string;
};

// Модель ответа при создании подтверждения
export type CreateConfirmationResponseDTO = ConfirmationItem;

// Модель для списка подтверждений
export type ConfirmationListResponseDTO = ConfirmationItem[]; 