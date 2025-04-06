import { StepsConfiguration } from "@/models/common";
import { InvoiceStep } from "./invoiceStep";
import { InfoStep } from "./infoStep";
import { OrganizationsStep } from "./organizationsStep";

export const STEPS_CONFIGURATION: StepsConfiguration = {
    0: {
        order: 0,
        key: 'register_expedition_step_1',
        title: 'Данные организаций',
        subtitle: 'Выберите направление и импортера/экспортера',
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
        subtitle: 'Зарегистрируйте накладные',
        component: <InvoiceStep />
    },
};