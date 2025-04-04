import { z } from "zod";
import { zoneNameValueMapper } from "@shared/business/utils";

export const checkpointSchema = z.object({
  name: z.string().min(1, 'Введите название').default(''),
  zone: z.string().refine((zone) => typeof zoneNameValueMapper(zone) !== null).default(''),
});

export type CheckpointFormData = z.infer<typeof checkpointSchema>;