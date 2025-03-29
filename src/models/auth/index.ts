export type User = {
    id: number;
    role: 'admin' | 'operator' | 'logistician';
    username: string;
    fullName?: string;
};

export type PostLoginResponseDTO = {
    token: string;
    refreshToken: string;
    user: User;
};

export type PostLoginRequestDTO = {
    username: string;
    password: string;
};

export type PostRefreshTokenRequestDTO = {
    refreshToken: string;
};

export type PostRefreshTokenResponseDTO = {
    token: string;
    refreshToken: string;
};

export type PostVerifyTokenDTO = {
    token: string;
}

export type GetUserDataResponseDTO = Pick<PostLoginResponseDTO, 'user'>;
