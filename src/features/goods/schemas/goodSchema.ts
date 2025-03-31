import { z } from "zod";

export const goodSchema = z.object({
  name: z.string().min(1, 'Введите название'),
  description: z.string().optional(),
  quantity: z.number().min(0, 'Количество должно быть положительным числом').default(0),
  unit_of_measurement: z.string().min(1, 'Необходимо выбрать единицу измерения'),
});

export type GoodFormData = z.infer<typeof goodSchema>;