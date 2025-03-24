import { PostLoginResponseDTO, User } from "@/models/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
    token: string | null;
    refreshToken: string | null;
    user: User | null;
};

const initialState: AuthState = {
    token: 'fake-token',
    refreshToken: 'fake-refresh-token',
    user: {
        id: 1,
        role: 'operator',
        username: 'operator1'
    }
};

type LoginSuccessAction = PayloadAction<PostLoginResponseDTO>;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: LoginSuccessAction) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
        logout(state) {
            state.user = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;