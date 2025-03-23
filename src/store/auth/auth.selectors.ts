import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectAuthSelf = (state: RootState) => state.auth;

export const selectUserRole = createSelector(selectAuthSelf, (auth) => auth.user?.role);

export const selectUser = createSelector(selectAuthSelf, (auth) => auth.user);

export const selectToken = createSelector(selectAuthSelf, (auth) => auth.token);

export const selectRefreshToken = createSelector(selectAuthSelf, (auth) => auth.refreshToken);
