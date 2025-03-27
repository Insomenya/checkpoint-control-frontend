import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@store/store';
import { logout, tokenUpdated, userDataSet } from '@store/auth/auth.slice';
import { GetUserDataResponseDTO, PostRefreshTokenRequestDTO, PostRefreshTokenResponseDTO, User } from '@/models/auth';
import { API_PATHS } from '@shared/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: API_PATHS.ROOT,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Попытка обновить токен
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: API_PATHS.AUTH.REFRESH_TOKEN,
          method: 'POST',
          body: { refreshToken } as PostRefreshTokenRequestDTO,
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Сохраняем новый токен и refresh-токен
        api.dispatch(tokenUpdated(refreshResult.data as PostRefreshTokenResponseDTO));
        // Повторяем оригинальный запрос с новым токеном
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Если refresh-токен недействителен, выходим из системы
        api.dispatch(logout());
      }
    } else {
      // Если refresh-токен отсутствует, выходим из системы
      api.dispatch(logout());
    }
  }

  return result;
};
