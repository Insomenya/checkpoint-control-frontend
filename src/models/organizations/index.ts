import { GetResponseDTO } from "../common";

export type Organization = {
    id?: number;
    name: string;
    address: string;
    contactPhone: string;
    isOwn: boolean;
}

export type GetOrganizationsResponseDTO = GetResponseDTO<Organization>;

export type PostAddOrganizationRequestDTO = Omit<Organization, 'id'>;

export type PutEditOrganizationRequestDTO = Organization;

export type DeleteOrganizationRequestDTO = Pick<Organization, 'id'>;
