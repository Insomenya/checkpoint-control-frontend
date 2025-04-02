export type Good = {
    id?: number;
    name: string;
    description?: string;
    quantity: number;
    unitOfMeasurement: string;
}

export type GetGoodsPaginatedRequestDTO = {
    page: number;
    limit: number;
    sort: string;
    order: 'asc' | 'desc';
    filters: object;
};

export type GetGoodsResponseDTO = {
    goods: Good[],
};

export type PostAddGoodRequestDTO = Omit<Good, 'id'>;

export type PutEditGoodRequestDTO = Good;

export type DeleteGoodRequestDTO = Pick<Good, 'id'>;
