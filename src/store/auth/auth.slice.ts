import { PostLoginResponseDTO, User } from "@/models/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
    token: string | null;
    refreshToken: string | null;
    user: User | null;
};

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: null,
};

type TokenUpdatedDTO = Omit<AuthState, 'user'>;
type UserDataSetDTO = Pick<AuthState, 'user'>;

type LoginSuccessAction = PayloadAction<PostLoginResponseDTO>;
type TokenUpdatedAction = PayloadAction<TokenUpdatedDTO>;
type UserDataSetAction = PayloadAction<UserDataSetDTO>;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: LoginSuccessAction) {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
        tokenUpdated(state, action: TokenUpdatedAction) {
            if (action.payload.token && action.payload.refreshToken) {
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            }
        },
        userDataSet(state, action: UserDataSetAction) {
            state.user = action.payload.user;
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

export const { loginSuccess, tokenUpdated, logout, userDataSet } = authSlice.actions;