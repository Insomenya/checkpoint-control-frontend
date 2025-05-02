import { ConfirmationItem } from "../expeditions";

export type CreateConfirmationRequestDTO = {
    expedition_id: number;
    checkpoint_id: number;
    status: string;
};

export type CreateConfirmationResponseDTO = ConfirmationItem;

export type ConfirmationListResponseDTO = ConfirmationItem[]; 