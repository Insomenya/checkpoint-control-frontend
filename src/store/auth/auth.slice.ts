import { GetUserDataResponseDTO, PostLoginResponseDTO, PostRefreshTokenResponseDTO, User } from "@/models/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
    access: string | null;
    refresh: string | null;
    user: User | null;
};

const initialState: AuthState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    user: null,
};

type LoginSuccessAction = PayloadAction<PostLoginResponseDTO>;
type TokenUpdatedAction = PayloadAction<PostRefreshTokenResponseDTO>;
type UserDataSetAction = PayloadAction<GetUserDataResponseDTO>;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: LoginSuccessAction) {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            localStorage.setItem('access', action.payload.access);
            localStorage.setItem('refresh', action.payload.refresh);
        },
        tokenUpdated(state, action: TokenUpdatedAction) {
            if (action.payload.access && action.payload.refresh) {
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
                localStorage.setItem('access', action.payload.access);
                localStorage.setItem('refresh', action.payload.refresh);
            }
        },
        userDataSet(state, action: UserDataSetAction) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
            state.access = null;
            state.refresh = null;
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        },
    },
});

export const { loginSuccess, tokenUpdated, logout, userDataSet } = authSlice.actions;