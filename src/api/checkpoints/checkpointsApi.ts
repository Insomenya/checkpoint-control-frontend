import { 
  GetCheckpointsResponseDTO, 
  GetCheckpointByIdResponseDTO,
  CreateCheckpointRequestDTO, 
  CreateCheckpointResponseDTO,
  UpdateCheckpointRequestDTO,
  UpdateCheckpointResponseDTO,
  PatchCheckpointRequestDTO,
  CheckpointIdParam
} from '@/models/checkpoints';
import { baseApi } from '../baseApi';
import { API_PATHS } from '@shared/common/constants';

const checkpointsApiSlice = baseApi.enhanceEndpoints({addTagTypes: ['Checkpoints']}).injectEndpoints({
  endpoints: (builder) => ({
    getCheckpoints: builder.query<GetCheckpointsResponseDTO, void>({
      query: () => ({
        url: `${API_PATHS.CHECKPOINTS.ROOT}/`,
        method: 'GET'
      }),
      providesTags: ['Checkpoints'],
    }),
    
    getCheckpointById: builder.query<GetCheckpointByIdResponseDTO, number>({
      query: (id) => ({
        url: `${API_PATHS.CHECKPOINTS.ROOT}/${id}/`,
        method: 'GET'
      }),
      providesTags: ['Checkpoints'],
    }),
    
    createCheckpoint: builder.mutation<CreateCheckpointResponseDTO, CreateCheckpointRequestDTO>({
      query: (checkpointData) => ({
        url: `${API_PATHS.CHECKPOINTS.ROOT}/`,
        method: 'POST',
        body: checkpointData,
      }),
      invalidatesTags: ['Checkpoints'],
    }),
    
    updateCheckpoint: builder.mutation<UpdateCheckpointResponseDTO, UpdateCheckpointRequestDTO & CheckpointIdParam>({
      query: ({ id, ...checkpointData }) => ({
        url: `${API_PATHS.CHECKPOINTS.ROOT}/${id}/`,
        method: 'PUT',
        body: checkpointData,
      }),
      invalidatesTags: ['Checkpoints'],
    }),
    
    patchCheckpoint: builder.mutation<UpdateCheckpointResponseDTO, PatchCheckpointRequestDTO & CheckpointIdParam>({
      query: ({ id, ...checkpointData }) => ({
        url: `${API_PATHS.CHECKPOINTS.ROOT}/${id}/`,
        method: 'PATCH',
        body: checkpointData,
      }),
      invalidatesTags: ['Checkpoints'],
    }),
    
    deleteCheckpoint: builder.mutation<void, CheckpointIdParam>({
      query: ({ id }) => ({
        url: `${API_PATHS.CHECKPOINTS.ROOT}/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Checkpoints'],
    }),
  }),
});

export const { 
  useGetCheckpointsQuery,
  useGetCheckpointByIdQuery, 
  useCreateCheckpointMutation, 
  useUpdateCheckpointMutation,
  usePatchCheckpointMutation, 
  useDeleteCheckpointMutation 
} = checkpointsApiSlice;