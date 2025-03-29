import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CommonState = {
    verifyKey: number;
};

const initialState: CommonState = {
    verifyKey: 1,
};

type VerifyKeySetAction = PayloadAction<number>;

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        verifyKeySet(state, action: VerifyKeySetAction) {
            state.verifyKey = action.payload;
        },
    },
});

export const { verifyKeySet } = commonSlice.actions;