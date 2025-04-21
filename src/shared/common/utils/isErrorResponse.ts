import { ErrorResponse } from "@/models/common";


export const isErrorResponse = (value: unknown): value is ErrorResponse => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'status' in value &&
        typeof value.status === 'number' &&
        'data' in value &&
        typeof value.data === 'object' &&
        value.data !== null &&
        'detail' in value.data &&
        typeof value.data.detail === 'string'
    );
};
