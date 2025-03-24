import { LoginFormData } from '@/features/auth/schemas';
import { baseApi } from '../baseApi';
import { PostLoginResponseDTO } from '@/models/auth';
import { API_PATHS } from '@shared/constants';

const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<PostLoginResponseDTO, LoginFormData>({
      query: (credentials) => ({
        url: API_PATHS.AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;