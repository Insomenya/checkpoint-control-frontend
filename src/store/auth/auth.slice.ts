import { PostLoginResponseDTO, PostRefreshTokenResponseDTO, User } from "@/models/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
    token: string | null;
    refreshToken: string | null;
    user: User | null;
};

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: localStorage.getItem('user') ?? JSON.parse(localStorage.getItem('user') ?? '{}'),
};

type LoginSuccessAction = PayloadAction<PostLoginResponseDTO>;
type TokenUpdatedAction = PayloadAction<PostRefreshTokenResponseDTO>;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: LoginSuccessAction) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        tokenUpdated(state, action: TokenUpdatedAction) {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        },
    },
});

export const { loginSuccess, tokenUpdated, logout } = authSlice.actions;