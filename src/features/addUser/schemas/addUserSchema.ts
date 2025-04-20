import { z } from "zod";

export const addUserBaseSchema = z.object({
    username: z.string().min(1, 'Логин обязателен'),
    role: z.string().min(1, 'Выберите роль'),
    fullName: z.string().optional(),
    checkpoint_id: z.string().optional(),
});

export const addUserSchema = addUserBaseSchema.superRefine((data, ctx) => {
    if (data.role === 'operator' && (!data.checkpoint_id || data.checkpoint_id.length === 0)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Для оператора необходимо выбрать КПП',
            path: ['checkpoint_id']
        });
    }
});

export type AddUserFormData = z.infer<typeof addUserSchema>;