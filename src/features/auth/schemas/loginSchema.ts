import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, 'Логин обязателен'),
    password: z.string().min(1, 'Пароль обязателен')
});

export type LoginFormData = z.infer<typeof loginSchema>;