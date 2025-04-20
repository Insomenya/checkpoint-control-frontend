import { phoneRegex } from "@shared/business/utils";
import { EXPEDITION_TYPES_ARRAY } from "@shared/common/constants";
import { z } from "zod";

export const infoStepSchema = z.object({
    name: z.string().min(1, 'Введите название').default(''),
    type: z.enum(EXPEDITION_TYPES_ARRAY, {
        errorMap: (issue, ctx) => {
            if (issue.code === "invalid_enum_value") {
                return { message: "Выберите одно из допустимых значений типа экспедиции" };
            }

            return { message: ctx.defaultError };
        }
    }).default(''),
    full_name: z.string().min(1, 'Введите имя ответственного').default(''),
    phone_number: z.string().min(1, 'Введите контактный номер').regex(phoneRegex, 'Введите номер в формате "+7(XXX)XXX-XX-XX"').default(''),
    license_plate: z.string().optional().default(''),
    vehicle_model: z.string().optional().default(''),
}).superRefine((data, ctx) => {
    if (data.type === 'auto') {
        if (!data.license_plate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Введите регистрационный номер',
                path: ['license_plate'],
            });
        }

        if (!data.vehicle_model) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Введите модель ТС',
                path: ['vehicle_model'],
            });
        }
    }
});

export const initialValues: InfoStepFormData = {
    name: '',
    type: 'auto',
    full_name: '',
    phone_number: '',
    license_plate: '',
    vehicle_model: '',
};

export type InfoStepFormData = z.infer<typeof infoStepSchema>;