export type Organization = {
    id?: number;
    name: string;
    address: string;
    contactPhone: string;
    isOwn: boolean;
}

export type GetOrganizationsResponseDTO = {
    organizations: Organization[],
};

export type PostAddOrganizationRequestDTO = Omit<Organization, 'id'>;

export type PutEditOrganizationRequestDTO = Organization;

export type DeleteOrganizationRequestDTO = Pick<Organization, 'id'>;
