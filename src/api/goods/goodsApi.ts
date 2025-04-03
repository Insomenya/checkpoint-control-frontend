import { baseApi } from '../baseApi';
import { DeleteGoodRequestDTO, GetGoodsResponseDTO, PostAddGoodRequestDTO, PutEditGoodRequestDTO } from '@/models/goods';
import { API_PATHS } from '@shared/constants';

const goodsApiSlice = baseApi.enhanceEndpoints({addTagTypes: ['Goods']}).injectEndpoints({
  endpoints: (builder) => ({
    getGoods: builder.query<GetGoodsResponseDTO, void>({
      query: () => API_PATHS.GOODS.ROOT,
      providesTags: ['Goods'],
    }),
    addGood: builder.mutation<void, PostAddGoodRequestDTO>({
      query: (body) => ({
        url: API_PATHS.GOODS.ROOT,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Goods'],
    }),
    updateGood: builder.mutation<void, PutEditGoodRequestDTO>({
      query: (body) => ({
        url: `${API_PATHS.GOODS.ROOT}/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Goods'],
    }),
    deleteGood: builder.mutation<void, DeleteGoodRequestDTO>({
      query: ({ id }) => ({
        url: `${API_PATHS.GOODS.ROOT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Goods'],
    }),
  }),
});

export const { useAddGoodMutation, useDeleteGoodMutation, useGetGoodsQuery, useUpdateGoodMutation } = goodsApiSlice;