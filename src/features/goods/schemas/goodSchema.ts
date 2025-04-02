import { z } from "zod";

export const goodSchema = z.object({
  name: z.string().min(1, 'Введите название').default(''),
  description: z.string().optional(),
  quantity: z.number().min(0, 'Количество должно быть положительным числом').default(0),
  unitOfMeasurement: z.string().min(1, 'Необходимо выбрать единицу измерения').default(''),
});

export type GoodFormData = z.infer<typeof goodSchema>;