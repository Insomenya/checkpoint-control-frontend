import { z } from "zod";

export const addInvoiceSchema = z.object({
    number: z.string().min(1, 'Введите номер накладной'),
    cargo_description: z.string().min(1, 'Введите описание груза'),
});

export const addGoodSchema = z.object({
    good_id: z.coerce.number({
        required_error: 'Выберите ТМЦ',
        invalid_type_error: 'Выберите ТМЦ',
    }),
    quantity: z.coerce.number({
        required_error: 'Введите количество',
        invalid_type_error: 'Количество должно быть числом',
    }).positive('Количество должно быть положительным числом'),
});

export type AddInvoiceFormData = z.infer<typeof addInvoiceSchema>;
export type AddGoodFormData = z.infer<typeof addGoodSchema>; 