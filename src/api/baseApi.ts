import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_PATHS } from "./paths";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_PATHS.ROOT,
    }),
    endpoints: () => ({}),
});