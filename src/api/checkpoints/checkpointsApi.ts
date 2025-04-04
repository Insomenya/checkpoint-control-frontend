import { DeleteCheckpointRequestDTO, GetCheckpointsResponseDTO, PostAddCheckpointRequestDTO, PutEditCheckpointRequestDTO } from '@/models/checkpoints';
import { baseApi } from '../baseApi';
import { API_PATHS } from '@shared/common/constants';

const checkpointsApiSlice = baseApi.enhanceEndpoints({addTagTypes: ['Checkpoints']}).injectEndpoints({
  endpoints: (builder) => ({
    getCheckpoints: builder.query<GetCheckpointsResponseDTO, void>({
      query: () => API_PATHS.CHECKPOINTS.ROOT,
      providesTags: ['Checkpoints'],
    }),
    addCheckpoint: builder.mutation<void, PostAddCheckpointRequestDTO>({
      query: (body) => ({
        url: API_PATHS.CHECKPOINTS.ROOT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Checkpoints'],
    }),
    updateCheckpoint: builder.mutation<void, PutEditCheckpointRequestDTO>({
      query: (body) => ({
        url: `${API_PATHS.CHECKPOINTS.ROOT}/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Checkpoints'],
    }),
    deleteCheckpoint: builder.mutation<void, DeleteCheckpointRequestDTO>({
      query: ({ id }) => ({
        url: `${API_PATHS.CHECKPOINTS.ROOT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Checkpoints'],
    }),
  }),
});

export const { useGetCheckpointsQuery, useAddCheckpointMutation, useUpdateCheckpointMutation, useDeleteCheckpointMutation } = checkpointsApiSlice;