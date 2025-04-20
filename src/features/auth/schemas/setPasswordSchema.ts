import { z } from 'zod';

export const setPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .max(100, 'Пароль не должен превышать 100 символов'),
  confirmPassword: z.string()
    .min(8, 'Подтверждение пароля должно содержать минимум 8 символов')
    .max(100, 'Подтверждение пароля не должно превышать 100 символов'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});

export type SetPasswordFormData = z.infer<typeof setPasswordSchema>; 