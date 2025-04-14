import { Expedition, Invoice, InvoiceGoodEntry, OrganizationsStep } from "@/models/expeditions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StepStatus, ZeroThroughTwo } from "@/models/common";

type NewInvoiceObject = Partial<Invoice> & {
    goods: Omit<InvoiceGoodEntry, 'invoice_id'>[];
};

type NewExpeditionObject = Partial<Expedition> & {
    invoices: NewInvoiceObject[];
}

export type ExpeditionState = {
    newExpedition: NewExpeditionObject;
    stepStatuses: StepStatus[];
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
    stepStatuses: ['pending', 'pending', 'pending']
};

type AddInvoiceAction = PayloadAction<Partial<Invoice>>;
type AddGoodAction = PayloadAction<InvoiceGoodEntry>;
type StepErrorAction = PayloadAction<ZeroThroughTwo>;
type StepValidAction = PayloadAction<ZeroThroughTwo>;
type OrganizationsStepSetAction = PayloadAction<Partial<OrganizationsStep>>;

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
        stepError(state, action: StepErrorAction) {
            state.stepStatuses[action.payload] = 'error';
        },
        stepValid(state, action: StepValidAction) {
            state.stepStatuses[action.payload] = 'valid';
        },
        organizationsStepSet(state, action: OrganizationsStepSetAction) {
            state.newExpedition.direction = action.payload.direction;
            state.newExpedition.sender_id = action.payload.sender_id;
            state.newExpedition.receiver_id = action.payload.receiver_id;
        },
        expeditionCleared(state) {
            state.newExpedition = initialState.newExpedition;
        },
    },
});

export const { invoiceAdded, goodAdded, expeditionCleared, stepError, stepValid, organizationsStepSet } = expeditionSlice.actions;