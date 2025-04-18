import { UserRoles } from "../common";

export type CheckpointMinimal = {
    id: number;
    name: string;
}

export type User = {
    id: number;
    role: UserRoles;
    role_display?: string;
    username: string;
    fullName?: string;
    checkpoint?: CheckpointMinimal;
};

export type PostLoginResponseDTO = {
    access: string;
    refresh: string;
};

export type PostLoginRequestDTO = {
    username: string;
    password: string;
};

export type PostRefreshTokenRequestDTO = {
    refresh: string;
};

export type PostRefreshTokenResponseDTO = {
    refresh: string;
    access: string;
};

export type PostVerifyTokenDTO = {
    token: string;
}

export type GetUserDataResponseDTO = User;
