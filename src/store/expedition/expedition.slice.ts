import { Expedition, InfoStep, Invoice, InvoiceGoodEntry, OrganizationsStep } from "@/models/expeditions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StepsNumbers, StepStatus, ZeroThroughTwo } from "@/models/common";

type NewInvoiceObject = Partial<Invoice> & {
    goods: Omit<InvoiceGoodEntry, 'invoice_id'>[];
};

type NewExpeditionObject = Partial<Expedition> & {
    invoices: NewInvoiceObject[];
}

export type ExpeditionState = {
    newExpedition: NewExpeditionObject;
    stepStatuses: StepStatus[];
    currentStep: StepsNumbers;
    newStep: StepsNumbers;
};

const initialState: ExpeditionState = {
    newExpedition: {
        phone_number: '',
        name: '',
        direction: 'IN',
        type: 'auto',
        start_date: new Date().toDateString(),
        end_date: '-',
        invoices: []
    },
    stepStatuses: ['pending', 'pending', 'pending'],
    currentStep: 0,
    newStep: 0,
};

type AddInvoiceAction = PayloadAction<Partial<Invoice>>;
type AddGoodAction = PayloadAction<InvoiceGoodEntry>;
type StepAction = PayloadAction<StepsNumbers>;
type OrganizationsStepSetAction = PayloadAction<Partial<OrganizationsStep>>;
type InfoStepSetAction = PayloadAction<Partial<InfoStep>>;

export const expeditionSlice = createSlice({
    name: 'expedition',
    initialState,
    reducers: {
        invoiceAdded(state, action: AddInvoiceAction) {
            state.newExpedition.invoices.push({ ...action.payload, goods: [] });
        },
        goodAdded(state, action: AddGoodAction) {
            const invoiceToAddGoodTo = state.newExpedition.invoices.find((invoice) => invoice.id === action.payload.invoice_id);

            if (invoiceToAddGoodTo != null) {
                invoiceToAddGoodTo.goods.push({ good_id: action.payload.good_id, quantity: action.payload.quantity });
            }
        },
        stepError(state, action: StepAction) {
            state.stepStatuses[action.payload] = 'error';
        },
        stepValid(state, action: StepAction) {
            state.stepStatuses[action.payload] = 'valid';
        },
        stepLeft(state, action: StepAction) {
            state.stepStatuses[action.payload] = 'leaving';
        },
        currentStepSet(state, action: StepAction) {
            state.currentStep = action.payload;
        },
        newStepSet(state, action: StepAction) {
            state.newStep = action.payload;
        },
        organizationsStepSet(state, action: OrganizationsStepSetAction) {
            state.newExpedition = {
                ...state.newExpedition,
                ...action.payload
            };
        },
        infoStepSet(state, action: InfoStepSetAction) {
            state.newExpedition = {
                ...state.newExpedition,
                ...action.payload
            };
        },
        expeditionCleared(state) {
            state.newExpedition = initialState.newExpedition;
        },
    },
});

export const { invoiceAdded, goodAdded, expeditionCleared, stepError, stepValid, stepLeft, organizationsStepSet, infoStepSet, currentStepSet, newStepSet } = expeditionSlice.actions;