import { baseApi } from '../baseApi';
import { 
  GetGoodsResponseDTO, 
  GetGoodByIdResponseDTO,
  CreateGoodRequestDTO, 
  CreateGoodResponseDTO,
  UpdateGoodRequestDTO,
  UpdateGoodResponseDTO,
  PatchGoodRequestDTO,
  GoodIdParam
} from '@/models/goods';
import { API_PATHS } from '@shared/common/constants';

const goodsApiSlice = baseApi.enhanceEndpoints({addTagTypes: ['Goods']}).injectEndpoints({
  endpoints: (builder) => ({
    getGoods: builder.query<GetGoodsResponseDTO, void>({
      query: () => ({
        url: `${API_PATHS.GOODS.ROOT}/`,
        method: 'GET'
      }),
      providesTags: ['Goods'],
    }),
    
    getGoodById: builder.query<GetGoodByIdResponseDTO, number>({
      query: (id) => ({
        url: `${API_PATHS.GOODS.ROOT}/${id}/`,
        method: 'GET'
      }),
      providesTags: ['Goods'],
    }),
    
    createGood: builder.mutation<CreateGoodResponseDTO, CreateGoodRequestDTO>({
      query: (goodData) => ({
        url: `${API_PATHS.GOODS.ROOT}/`,
        method: 'POST',
        body: goodData,
      }),
      invalidatesTags: ['Goods'],
    }),
    
    updateGood: builder.mutation<UpdateGoodResponseDTO, UpdateGoodRequestDTO & GoodIdParam>({
      query: ({ id, ...goodData }) => ({
        url: `${API_PATHS.GOODS.ROOT}/${id}/`,
        method: 'PUT',
        body: goodData,
      }),
      invalidatesTags: ['Goods'],
    }),
    
    patchGood: builder.mutation<UpdateGoodResponseDTO, PatchGoodRequestDTO & GoodIdParam>({
      query: ({ id, ...goodData }) => ({
        url: `${API_PATHS.GOODS.ROOT}/${id}/`,
        method: 'PATCH',
        body: goodData,
      }),
      invalidatesTags: ['Goods'],
    }),
    
    deleteGood: builder.mutation<void, GoodIdParam>({
      query: ({ id }) => ({
        url: `${API_PATHS.GOODS.ROOT}/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Goods'],
    }),
  }),
});

export const { 
  useGetGoodsQuery,
  useGetGoodByIdQuery, 
  useCreateGoodMutation, 
  useUpdateGoodMutation,
  usePatchGoodMutation, 
  useDeleteGoodMutation 
} = goodsApiSlice;