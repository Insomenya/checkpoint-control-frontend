import { createSlice } from "@reduxjs/toolkit";

type User = {
    role: 'admin' | 'operator';
    name: string;
};

export type AuthState = {
    token: string | null;
    refreshToken: string | null;
    user?: User;
};

const initialState: AuthState = {
    token: 'fake-token',
    refreshToken: 'fake-refresh-token',
    user: {
        role: 'operator',
        name: 'operator1'
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
});

export const {  } = authSlice.actions;