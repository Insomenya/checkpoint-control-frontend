export type User = {
    id: number;
    role: 'admin' | 'operator';
    username: string;
};

export type PostLoginResponseDTO = {
    token: string;
    refreshToken: string;
    user: User;
};
