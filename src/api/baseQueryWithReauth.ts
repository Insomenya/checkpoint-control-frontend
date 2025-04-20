import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@store/store';
import { logout, tokenUpdated } from '@store/auth/auth.slice';
import { PostRefreshTokenRequestDTO, PostRefreshTokenResponseDTO } from '@/models/auth';
import { API_PATHS } from '@shared/common/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: API_PATHS.ROOT,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access;

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
    const refresh = (api.getState() as RootState).auth.refresh;

    if (refresh) {
      const refreshResult = await baseQuery(
        {
          url: `${API_PATHS.AUTH.ROOT}${API_PATHS.AUTH.REFRESH}`,
          method: 'POST',
          body: { refresh } as PostRefreshTokenRequestDTO,
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const responseData = refreshResult.data as PostRefreshTokenResponseDTO;
        api.dispatch(tokenUpdated({
          access: responseData.access,
          refresh: refresh
        }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
