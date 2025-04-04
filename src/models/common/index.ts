import { ReactNode } from "react";

export type LabelValue = {
    label: string;
    value: string;
}

export enum DateFormat {
    RuDateOnly = 'dd.MM.yyyy',
    IsoDateOnly = 'yyyy-MM-dd'
}

export type ErrorResponse = {
    status: number,
    data: {
        message: string;
    }
};

export type UserRoles = 'operator' | 'logistician' | 'admin';

export type ZoneValues = 1 | 2 | 3;

type MenuDropdownOptionInfo = {
    key: string;
    label: string;
    path: string;
};

export type MenuItemInfo = {
    icon: ReactNode;
    label?: string;
    type: 'dropdown' | 'regular';
    path: string;
    options?: MenuDropdownOptionInfo[];
};

export type TableEditabilityOptions = 'c' | 'e' | 'd' | 'ce' | 'cd' | 'ed' | 'ced';

export type GetResponseDTO<T> = {
    data: T[];
};
