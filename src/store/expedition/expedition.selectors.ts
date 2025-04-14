import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ZeroThroughTwo } from "@/models/common";

const selectExpeditionSelf = (state: RootState) => state.expedition;

export const selectStepStatuses = createSelector(selectExpeditionSelf, (expedition) => expedition.stepStatuses);

export const selectCurrentStep = createSelector(selectExpeditionSelf, (expedition) => expedition.currentStep);

export const selectNewStep = createSelector(selectExpeditionSelf, (expedition) => expedition.newStep);

export const selectStepStatus = (step: ZeroThroughTwo) => createSelector(selectStepStatuses, (stepStatuses) => stepStatuses[step]);

export const selectOrganizationsStep = createSelector(selectExpeditionSelf, (expedition) => ({
    sender_id: expedition.newExpedition.sender_id,
    receiver_id: expedition.newExpedition.receiver_id,
    direction: expedition.newExpedition.direction,
}));

export const selectInfoStep = createSelector(selectExpeditionSelf, (expedition) => ({
    name: expedition.newExpedition.name,
    type: expedition.newExpedition.type,
    full_name: expedition.newExpedition.full_name,
    phone_number: expedition.newExpedition.phone_number,
    license_plate: expedition.newExpedition.license_plate,
    vehicle_model: expedition.newExpedition.vehicle_model,
}));
