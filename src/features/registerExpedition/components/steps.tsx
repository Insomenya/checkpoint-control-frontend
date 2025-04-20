import { StepsConfiguration } from "@/models/common";
import { InvoiceStep } from "./InvoiceStep/InvoiceStep";
import { InfoStep } from "./InfoStep";
import { OrganizationsStep } from "./OrganizationsStep";

export const STEPS_CONFIGURATION: StepsConfiguration = {
    0: {
        order: 0,
        key: 'register_expedition_step_1',
        title: 'Данные организаций',
        subtitle: 'Выберите направление, отправителя и получателя',
        component: <OrganizationsStep />
    },
    1: {
        order: 1,
        key: 'register_expedition_step_2',
        title: 'Основная информация',
        subtitle: 'Заполните основную информацию об экспедиции',
        component: <InfoStep />
    },
    2: {
        order: 2,
        key: 'register_expedition_step_3',
        title: 'Накладные',
        subtitle: 'Добавьте накладные',
        component: <InvoiceStep />
    },
};
