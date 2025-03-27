import { baseApi } from '../baseApi';
import { GetUserDataResponseDTO, PostLoginRequestDTO, PostLoginResponseDTO, PostRefreshTokenRequestDTO, PostRefreshTokenResponseDTO, PostVerifyTokenDTO } from '@/models/auth';
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
    getUserData: builder.query<GetUserDataResponseDTO, null>({
      query: () => ({
        url: API_PATHS.AUTH.GET_USER_DATA,
        method: 'GET'
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useVerifyTokenMutation, useGetUserDataQuery } = authApiSlice;