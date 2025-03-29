import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectCommonSelf = (state: RootState) => state.common;

export const selectVerifyKey = createSelector(selectCommonSelf, (common) => common.verifyKey);
