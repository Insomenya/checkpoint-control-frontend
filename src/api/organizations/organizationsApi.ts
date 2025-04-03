import { baseApi } from '../baseApi';
import { DeleteOrganizationRequestDTO, GetOrganizationsResponseDTO, PostAddOrganizationRequestDTO, PutEditOrganizationRequestDTO } from '@/models/organizations';
import { API_PATHS } from '@shared/common/constants';

const organizationsApiSlice = baseApi.enhanceEndpoints({addTagTypes: ['Organizations']}).injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<GetOrganizationsResponseDTO, void>({
      query: () => API_PATHS.ORGANIZATIONS.ROOT,
      providesTags: ['Organizations'],
    }),
    addOrganization: builder.mutation<void, PostAddOrganizationRequestDTO>({
      query: (body) => ({
        url: API_PATHS.ORGANIZATIONS.ROOT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Organizations'],
    }),
    updateOrganization: builder.mutation<void, PutEditOrganizationRequestDTO>({
      query: (body) => ({
        url: `${API_PATHS.ORGANIZATIONS.ROOT}/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Organizations'],
    }),
    deleteOrganization: builder.mutation<void, DeleteOrganizationRequestDTO>({
      query: ({ id }) => ({
        url: `${API_PATHS.ORGANIZATIONS.ROOT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Organizations'],
    }),
  }),
});

export const { useGetOrganizationsQuery, useAddOrganizationMutation, useUpdateOrganizationMutation, useDeleteOrganizationMutation } = organizationsApiSlice;