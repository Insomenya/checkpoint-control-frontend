import { baseApi } from '../baseApi';
import { API_PATHS } from '@shared/common/constants';
import { DeleteUserRequestDTO, GetUsersResponseDTO, PostAddUserRequestDTO } from '@/models/users';

const usersApiSlice = baseApi.enhanceEndpoints({addTagTypes: ['Users']}).injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponseDTO, void>({
      query: () => API_PATHS.USERS.ROOT,
      providesTags: ['Users'],
    }),
    addUser: builder.mutation<void, PostAddUserRequestDTO>({
      query: (body) => ({
        url: API_PATHS.USERS.ROOT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<void, DeleteUserRequestDTO>({
      query: ({ id }) => ({
        url: `${API_PATHS.USERS.ROOT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } = usersApiSlice;