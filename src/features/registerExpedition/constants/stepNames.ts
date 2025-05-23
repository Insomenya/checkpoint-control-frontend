import { ZeroThroughTwo } from "@/models/common";

export enum StepName {
    organizations = 'ORGANIZATIONS',
    info = 'INFO',
    invoices = 'INVOICES',
}

export const STEP_INDECIES: Record<StepName, ZeroThroughTwo> = {
    [StepName.organizations]: 0,
    [StepName.info]: 1,
    [StepName.invoices]: 2,
}