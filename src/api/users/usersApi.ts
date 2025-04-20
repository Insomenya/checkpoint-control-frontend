import { baseApi } from '../baseApi';
import { API_PATHS } from '@shared/common/constants';
import { 
  GetUsersResponseDTO, 
  SignupUserRequestDTO, 
  SignupUserResponseDTO,
  SetPasswordRequestDTO,
  SetPasswordResponseDTO,
  GetUserStatsResponseDTO
} from '@/models/users';

const usersApiSlice = baseApi.enhanceEndpoints({addTagTypes: ['Users']}).injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponseDTO, void>({
      query: () => ({
        url: `${API_PATHS.AUTH.ROOT}${API_PATHS.AUTH.USERS}`,
        method: 'GET'
      }),
      providesTags: ['Users'],
    }),
    
    getUserStats: builder.query<GetUserStatsResponseDTO, void>({
      query: () => ({
        url: `${API_PATHS.AUTH.ROOT}${API_PATHS.AUTH.STATS}`,
        method: 'GET'
      }),
      providesTags: ['Users'],
    }),
    
    signupUser: builder.mutation<SignupUserResponseDTO, SignupUserRequestDTO>({
      query: (userData) => ({
        url: `${API_PATHS.AUTH.ROOT}${API_PATHS.AUTH.SIGNUP}`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
    
    setPassword: builder.mutation<SetPasswordResponseDTO, { token: string, data: SetPasswordRequestDTO }>({
      query: ({ token, data }) => ({
        url: `${API_PATHS.AUTH.ROOT}${API_PATHS.AUTH.SETPASS}/${token}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { 
  useGetUsersQuery, 
  useGetUserStatsQuery,
  useSignupUserMutation, 
  useSetPasswordMutation 
} = usersApiSlice;