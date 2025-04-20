import { GetResponseDTO } from "../common";

export type Organization = {
    id?: number;
    name: string;
    address: string;
    contact_phone: string;
}

export type GetOrganizationsResponseDTO = Organization[];

export type GetOrganizationByIdResponseDTO = Organization;

export type CreateOrganizationRequestDTO = Omit<Organization, 'id'>;

export type CreateOrganizationResponseDTO = Organization;

export type UpdateOrganizationRequestDTO = Omit<Organization, 'id'>;

export type UpdateOrganizationResponseDTO = Organization;

export type PatchOrganizationRequestDTO = Partial<Omit<Organization, 'id'>>;

export type OrganizationIdParam = {
    id: number;
};
