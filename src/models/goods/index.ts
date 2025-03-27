export type Good = {
    id: number;
    name: string;
    description?: string;
    quantity: number;
    unit_of_measurement: string;
}

export type GetGoodsRequestDTO = {
    page: number;
    limit: number;
    sort: string;
    order: 'asc' | 'desc';
    filters: object;
};
