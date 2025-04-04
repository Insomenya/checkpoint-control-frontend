import { GetResponseDTO } from "../common";

export type Checkpoint = {
    id?: number;
    name: string;
    zone: 1 | 2 | 3;
}

export type GetCheckpointsResponseDTO = GetResponseDTO<Checkpoint>;

export type PostAddCheckpointRequestDTO = Omit<Checkpoint, 'id'>;

export type PutEditCheckpointRequestDTO = Checkpoint;

export type DeleteCheckpointRequestDTO = Pick<Checkpoint, 'id'>;
