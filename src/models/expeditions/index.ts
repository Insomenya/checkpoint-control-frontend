export type ExpeditionDirections = 'IN' | 'OUT';

export type ExpeditionTypes = 'auto' | 'selfout' | 'selfauto';

export type Expedition = {
    id?: number;
    name: string;
    direction: ExpeditionDirections;
    type: ExpeditionTypes;
    sender_id: number;
    receiver_id: number;
    created_by: number;
    full_name?: string;
    passport_number?: string;
    phone_number?: string;
    license_plate?: string;
    vehicle_model?: string;
    start_date?: string;
    end_date?: string;
};

export type Invoice = {
    id?: number;
    expedition_id: number;
    number: string;
    cargo_description?: string;
}

export type InvoiceGoodEntry = {
    invoice_id: number;
    good_id: number;
    quantity: number;
}
