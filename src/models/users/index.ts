import { User } from "../auth";

// Модель пользователя в ответе API
export type UserDTO = {
    id: number;
    username: string;
    role: string;
    role_display: string;
    checkpoint_id?: number;
    checkpoint_name?: string;
    is_password_set: boolean;
};

// Модель ответа на получение списка пользователей
export type GetUsersResponseDTO = UserDTO[];

// Модель для регистрации нового пользователя
export type SignupUserRequestDTO = {
    username: string;
    role: string;
    checkpoint_id?: number;
};

// Модель ответа на регистрацию нового пользователя
export type SignupUserResponseDTO = {
    user_id: number;
    username: string;
    token: string;
    signup_link: string;
};

// Модель для установки пароля
export type SetPasswordRequestDTO = {
    password: string;
};

// Модель ответа на установку пароля
export type SetPasswordResponseDTO = {
    message: string;
};

// Модель для получения статистики по пользователям
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
