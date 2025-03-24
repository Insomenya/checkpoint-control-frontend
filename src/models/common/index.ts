export type LabelValue = {
    label: string;
    value: string;
}

export enum DateFormat {
    RuDateOnly = 'dd.MM.yyyy',
    IsoDateOnly = 'yyyy-MM-dd'
}

export type ErrorResponse = {
    status: number,
    data: {
        message: string;
    }
};
