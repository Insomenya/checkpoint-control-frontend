import { z } from "zod";
import { zoneNameValueMapper } from "@shared/business/utils";

export const checkpointSchema = z.object({
  name: z.string().min(1, 'Введите название').default(''),
  zone: z.string().refine((zone) => zoneNameValueMapper(zone) !== null, "Выберите зону").default(''),
});

export type CheckpointFormData = z.infer<typeof checkpointSchema>;