import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectExpeditionSelf = (state: RootState) => state.expedition;

export const selectStepStatuses = createSelector(selectExpeditionSelf, (expedition) => expedition.stepStatuses);

export const selectOrganizationsStep = createSelector(selectExpeditionSelf, (expedition) => ({
    sender_id: expedition.newExpedition.sender_id,
    receiver_id: expedition.newExpedition.receiver_id,
    direction: expedition.newExpedition.direction,
}));
