import { z } from "zod";

export const addUserSchema = z.object({
    username: z.string().min(1, 'Логин обязателен'),
    role: z.string().min(1, 'Выберите роль'),
    fullName: z.string().optional(),
    checkpoint_id: z.string().optional(),
});

export type AddUserFormData = z.infer<typeof addUserSchema>;