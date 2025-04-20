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

export type GoodItem = {
    id: number;
    name: string;
    description: string;
    unit_of_measurement: string;
    unit_of_measurement_display: string;
};

export type InvoiceGoodItem = {
    id: number;
    good: GoodItem;
    quantity: number;
};

export type CreateGoodItem = {
    name: string;
    description: string;
    unit_of_measurement: string;
    quantity: number;
};

export type CreateInvoiceItem = {
    number: string;
    cargo_description: string;
    goods: CreateGoodItem[];
};

export type InvoiceItem = {
    id: number;
    number: string;
    cargo_description: string;
    invoice_goods: InvoiceGoodItem[];
};

export type CreateExpeditionRequestDTO = {
    name: string;
    direction: ExpeditionDirections;
    sender_id: number;
    receiver_id: number;
    type: ExpeditionTypes;
    full_name: string;
    phone_number: string;
    license_plate: string;
    vehicle_model: string;
    passport_number: string;
    invoices: CreateInvoiceItem[];
};

export type CreateExpeditionResponseDTO = {
    id: number;
    name: string;
    direction: string;
    direction_display: string;
    type: string;
    type_display: string;
    sender: number;
    sender_name: string;
    receiver: number;
    receiver_name: string;
    created_by: number;
    full_name: string;
    passport_number: string;
    phone_number: string;
    license_plate: string;
    vehicle_model: string;
    start_date: string;
    end_date: string;
    invoices: InvoiceItem[];
};

export type ExpeditionDetailsResponseDTO = CreateExpeditionResponseDTO;

export type ExpeditionBriefResponseDTO = {
    expedition_ids: number[];
};

export type ConfirmationItem = {
    id: number;
    expedition: {
        id: number;
        name: string;
    };
    confirmed_by: number;
    confirmed_by_username: string;
    zone: number;
    zone_name: string;
    status: string;
    status_display: string;
    confirmed_at: string;
};

export type ExpeditionStatusResponseDTO = ExpeditionDetailsResponseDTO & {
    last_confirmation: ConfirmationItem;
};

export type OrganizationsStep = Pick<Expedition, 'direction' | 'sender_id' | 'receiver_id'>;

export type InfoStep = Pick<Expedition, 'name' | 'type' | 'full_name' | 'phone_number' | 'license_plate' | 'vehicle_model'>;
