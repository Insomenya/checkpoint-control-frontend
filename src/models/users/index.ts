import { User } from "../auth";

export type UserDTO = {
    id: number;
    username: string;
    role: string;
    role_display: string;
    checkpoint_id?: number;
    checkpoint_name?: string;
    is_password_set: boolean;
};

export type GetUsersResponseDTO = UserDTO[];

export type SignupUserRequestDTO = {
    username: string;
    role: string;
    checkpoint_id?: number;
};

export type SignupUserResponseDTO = {
    user_id: number;
    username: string;
    token: string;
    signup_link: string;
};

export type SetPasswordRequestDTO = {
    password: string;
};

export type SetPasswordResponseDTO = {
    message: string;
};

export type GetUserStatsResponseDTO = {
    total_users: number;
    users_by_role: {
        role: string;
        count: number;
    }[];
    password_set_count: number;
    password_not_set_count: number;
    operators_without_checkpoint_count: number;
};
