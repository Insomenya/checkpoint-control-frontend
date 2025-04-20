import { baseApi } from '../baseApi';
import { API_PATHS } from '@shared/common/constants';
import { 
  CreateExpeditionRequestDTO, 
  CreateExpeditionResponseDTO, 
  ExpeditionDetailsResponseDTO, 
  ExpeditionBriefResponseDTO,
  ExpeditionStatusResponseDTO
} from '@/models/expeditions';

const expeditionsApiSlice = baseApi.enhanceEndpoints({ addTagTypes: ['Expeditions'] }).injectEndpoints({
  endpoints: (builder) => ({
    createExpedition: builder.mutation<CreateExpeditionResponseDTO, CreateExpeditionRequestDTO>({
      query: (expeditionData) => ({
        url: `${API_PATHS.EXPEDITION.ROOT}`,
        method: 'POST',
        body: expeditionData,
      }),
      invalidatesTags: ['Expeditions']
    }),
    
    getExpeditionById: builder.query<ExpeditionDetailsResponseDTO, number>({
      query: (id) => ({
        url: `${API_PATHS.EXPEDITION.ROOT}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Expeditions']
    }),
    
    getAllExpeditions: builder.query<ExpeditionDetailsResponseDTO[], void>({
      query: () => ({
        url: `${API_PATHS.EXPEDITIONS.ROOT}`,
        method: 'GET',
      }),
      providesTags: ['Expeditions']
    }),
    
    getExpeditionsByCheckpoint: builder.query<ExpeditionDetailsResponseDTO[], { checkpointId: number, direction?: string }>({
      query: ({ checkpointId, direction }) => ({
        url: `${API_PATHS.EXPEDITIONS.ROOT}/${checkpointId}`,
        method: 'GET',
        params: direction ? { direction } : undefined
      }),
      providesTags: ['Expeditions']
    }),
    
    getExpeditionBriefByCheckpoint: builder.query<ExpeditionBriefResponseDTO, { checkpointId: number, direction?: string }>({
      query: ({ checkpointId, direction }) => ({
        url: `${API_PATHS.EXPEDITIONS.ROOT}${API_PATHS.EXPEDITIONS.BRIEF}/${checkpointId}`,
        method: 'GET',
        params: direction ? { direction } : undefined
      }),
      providesTags: ['Expeditions']
    }),
    
    getExpeditionStatus: builder.query<ExpeditionStatusResponseDTO, number>({
      query: (expeditionId) => ({
        url: `${API_PATHS.EXPEDITION.ROOT}${API_PATHS.EXPEDITION.STATUS}/${expeditionId}`,
        method: 'GET',
      }),
      providesTags: ['Expeditions']
    }),
    
    getAllExpeditionsStatus: builder.query<ExpeditionStatusResponseDTO[], void>({
      query: () => ({
        url: `${API_PATHS.EXPEDITIONS.ROOT}${API_PATHS.EXPEDITION.STATUS}`,
        method: 'GET',
      }),
      providesTags: ['Expeditions']
    }),
    
    getExpeditionsStatusByCheckpoint: builder.query<ExpeditionStatusResponseDTO[], number>({
      query: (checkpointId) => ({
        url: `${API_PATHS.EXPEDITIONS.ROOT}${API_PATHS.EXPEDITION.STATUS}/${checkpointId}`,
        method: 'GET',
      }),
      providesTags: ['Expeditions']
    }),
  }),
});

export const { 
  useCreateExpeditionMutation,
  useGetExpeditionByIdQuery,
  useGetAllExpeditionsQuery,
  useGetExpeditionsByCheckpointQuery,
  useGetExpeditionBriefByCheckpointQuery,
  useGetExpeditionStatusQuery,
  useGetAllExpeditionsStatusQuery,
  useGetExpeditionsStatusByCheckpointQuery
} = expeditionsApiSlice; 