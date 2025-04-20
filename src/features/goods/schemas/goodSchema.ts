import { z } from "zod";

export const goodSchema = z.object({
  name: z.string().min(1, 'Введите название').default(''),
  description: z.string().min(1, 'Введите описание').default(''),
  unit_of_measurement: z.string().min(1, 'Необходимо выбрать единицу измерения').default(''),
});

export type GoodFormData = z.infer<typeof goodSchema>;