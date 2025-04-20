import { Expedition, InfoStep, InvoiceItem, OrganizationsStep } from "@/models/expeditions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StepsNumbers, StepStatus } from "@/models/common";

type NewInvoiceObject = Partial<InvoiceItem> & {
    goods: { good_id: number; quantity: number }[];
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

type AddInvoiceAction = PayloadAction<Partial<InvoiceItem>>;
type AddGoodAction = PayloadAction<{ invoice_id: number; good_id: number; quantity: number }>;
type DeleteGoodAction = PayloadAction<{ invoice_id: number; good_id: number }>;
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
        goodDeleted(state, action: DeleteGoodAction) {
            const invoiceToRemoveGoodFrom = state.newExpedition.invoices.find((invoice) => invoice.id === action.payload.invoice_id);

            if (invoiceToRemoveGoodFrom != null) {
                invoiceToRemoveGoodFrom.goods = invoiceToRemoveGoodFrom.goods.filter(
                    (good) => good.good_id !== action.payload.good_id
                );
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
        expeditionCleared() {
            return initialState;
        },
    },
});

export const { 
    invoiceAdded, 
    goodAdded, 
    goodDeleted, 
    expeditionCleared, 
    stepError, 
    stepValid, 
    stepLeft, 
    organizationsStepSet, 
    infoStepSet, 
    currentStepSet, 
    newStepSet 
} = expeditionSlice.actions;