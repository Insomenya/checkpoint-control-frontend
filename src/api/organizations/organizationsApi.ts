import { baseApi } from '../baseApi';
import { 
  GetOrganizationsResponseDTO, 
  GetOrganizationByIdResponseDTO,
  CreateOrganizationRequestDTO, 
  CreateOrganizationResponseDTO,
  UpdateOrganizationRequestDTO,
  UpdateOrganizationResponseDTO,
  PatchOrganizationRequestDTO,
  OrganizationIdParam
} from '@/models/organizations';
import { API_PATHS } from '@shared/common/constants';

const organizationsApiSlice = baseApi.enhanceEndpoints({addTagTypes: ['Organizations']}).injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<GetOrganizationsResponseDTO, void>({
      query: () => ({
        url: `${API_PATHS.ORGS.ROOT}/`,
        method: 'GET'
      }),
      providesTags: ['Organizations'],
    }),
    
    getOrganizationById: builder.query<GetOrganizationByIdResponseDTO, number>({
      query: (id) => ({
        url: `${API_PATHS.ORGS.ROOT}/${id}/`,
        method: 'GET'
      }),
      providesTags: ['Organizations'],
    }),
    
    createOrganization: builder.mutation<CreateOrganizationResponseDTO, CreateOrganizationRequestDTO>({
      query: (organizationData) => ({
        url: `${API_PATHS.ORGS.ROOT}/`,
        method: 'POST',
        body: organizationData,
      }),
      invalidatesTags: ['Organizations'],
    }),
    
    updateOrganization: builder.mutation<UpdateOrganizationResponseDTO, UpdateOrganizationRequestDTO & OrganizationIdParam>({
      query: ({ id, ...organizationData }) => ({
        url: `${API_PATHS.ORGS.ROOT}/${id}/`,
        method: 'PUT',
        body: organizationData,
      }),
      invalidatesTags: ['Organizations'],
    }),
    
    patchOrganization: builder.mutation<UpdateOrganizationResponseDTO, PatchOrganizationRequestDTO & OrganizationIdParam>({
      query: ({ id, ...organizationData }) => ({
        url: `${API_PATHS.ORGS.ROOT}/${id}/`,
        method: 'PATCH',
        body: organizationData,
      }),
      invalidatesTags: ['Organizations'],
    }),
    
    deleteOrganization: builder.mutation<void, OrganizationIdParam>({
      query: ({ id }) => ({
        url: `${API_PATHS.ORGS.ROOT}/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Organizations'],
    }),
  }),
});

export const { 
  useGetOrganizationsQuery, 
  useGetOrganizationByIdQuery,
  useCreateOrganizationMutation, 
  useUpdateOrganizationMutation, 
  usePatchOrganizationMutation,
  useDeleteOrganizationMutation 
} = organizationsApiSlice;