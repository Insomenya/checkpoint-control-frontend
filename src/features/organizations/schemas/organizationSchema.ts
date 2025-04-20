import { phoneRegex } from "@shared/business/utils";
import { z } from "zod";

export const organizationSchema = z.object({
  name: z.string().min(1, 'Введите название').default(''),
  address: z.string().min(1, 'Введите адрес').default(''),
  contact_phone: z.string().min(1, 'Введите контактный номер').regex(phoneRegex, 'Введите номер в формате "+7(XXX)XXX-XX-XX"').default(''),
});

export type OrganizationFormData = z.infer<typeof organizationSchema>;