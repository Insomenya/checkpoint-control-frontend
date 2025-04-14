import { z } from "zod";

export const organizationsStepSchema = z.object({
  sender_id: z.string().min(1, 'Выберите отправителя').default(''),
  receiver_id: z.string().min(1, 'Выберите получателя').default(''),
});

export type OrganizationsStepFormData = z.infer<typeof organizationsStepSchema>;