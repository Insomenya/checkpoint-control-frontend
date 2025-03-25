import { baseApi } from '../baseApi';
import { PostLoginRequestDTO, PostLoginResponseDTO, PostRefreshTokenRequestDTO, PostRefreshTokenResponseDTO, PostVerifyTokenDTO } from '@/models/auth';
import { API_PATHS } from '@shared/constants';

const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<PostLoginResponseDTO, PostLoginRequestDTO>({
      query: (credentials) => ({
        url: API_PATHS.AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation<PostRefreshTokenResponseDTO, PostRefreshTokenRequestDTO>({
      query: (body) => ({
        url: API_PATHS.AUTH.REFRESH_TOKEN,
        method: 'POST',
        body,
      }),
    }),
    verifyToken: builder.mutation<PostVerifyTokenDTO, PostVerifyTokenDTO>({
      query: (body) => ({
        url: API_PATHS.AUTH.VERIFY_TOKEN,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useVerifyTokenMutation } = authApiSlice;