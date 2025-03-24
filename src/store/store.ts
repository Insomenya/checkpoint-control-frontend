import { baseApi } from "@api/baseApi";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { commonSlice } from "./common/common.slice";
import { authSlice } from "./auth/auth.slice";

const reducers = {};

const createRootReducer = () => 
    combineReducers({
        ...reducers,
        [baseApi.reducerPath]: baseApi.reducer,
        [commonSlice.reducerPath]: commonSlice.reducer,
        [authSlice.reducerPath]: authSlice.reducer
    });

export const store = configureStore({
    reducer: createRootReducer(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;