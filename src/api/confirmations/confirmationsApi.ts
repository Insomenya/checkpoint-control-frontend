import { baseApi } from '../baseApi';
import { API_PATHS } from '@shared/common/constants';
import { 
  CreateConfirmationRequestDTO, 
  CreateConfirmationResponseDTO, 
  ConfirmationListResponseDTO 
} from '@/models/confirmations';

const confirmationsApiSlice = baseApi.enhanceEndpoints({ addTagTypes: ['Confirmations', 'Expeditions'] }).injectEndpoints({
  endpoints: (builder) => ({
    createConfirmation: builder.mutation<CreateConfirmationResponseDTO, CreateConfirmationRequestDTO>({
      query: (confirmationData) => ({
        url: `${API_PATHS.CONFIRM.ROOT}`,
        method: 'POST',
        body: confirmationData,
      }),
      invalidatesTags: ['Confirmations', 'Expeditions']
    }),
    
    getConfirmationsByZone: builder.query<ConfirmationListResponseDTO, number>({
      query: (zoneId) => ({
        url: `${API_PATHS.CONFIRMED.ROOT}${API_PATHS.CONFIRMED.ZONE}/${zoneId}`,
        method: 'GET',
      }),
      providesTags: ['Confirmations']
    }),
    
    getConfirmationsByCheckpoint: builder.query<ConfirmationListResponseDTO, number>({
      query: (checkpointId) => ({
        url: `${API_PATHS.CONFIRMED.ROOT}${API_PATHS.CONFIRMED.CHECKPOINT}/${checkpointId}`,
        method: 'GET',
      }),
      providesTags: ['Confirmations']
    }),
  }),
});

export const { 
  useCreateConfirmationMutation,
  useGetConfirmationsByZoneQuery,
  useGetConfirmationsByCheckpointQuery
} = confirmationsApiSlice; 